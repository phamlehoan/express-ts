// src/app/controllers/api/order.controller.ts
import { Request, Response } from 'express';
import { db } from '@models';

const { sequelize, Order, OrderItem, Product, Customer } = db;

export class OrderController {
  /**
   * Create a new order
   */
  async create(req: Request, res: Response) {
    const t = await sequelize.transaction();
    try {
      const { customerId, items } = req.body;

      if (!customerId || !items || !Array.isArray(items) || items.length === 0) {
        await t.rollback();
        return res.status(400).json({ error: 'Customer ID and a non-empty array of items are required.' });
      }

      // Check if customer exists
      const customer = await Customer.findByPk(customerId, { transaction: t });
      if (!customer) {
        await t.rollback();
        return res.status(404).json({ error: `Customer with ID ${customerId} not found.` });
      }

      let totalAmount = 0;
      const productIds = items.map(item => item.productId);
      const products = await Product.findAll({ where: { id: productIds }, transaction: t });

      // Check for stock and calculate total amount
      for (const item of items) {
        const product = products.find(p => p.id === item.productId);
        if (!product) {
          await t.rollback();
          return res.status(404).json({ error: `Product with ID ${item.productId} not found.` });
        }
        if (product.stock_quantity < item.quantity) {
          await t.rollback();
          return res.status(400).json({ error: `Not enough stock for product ${product.name}. Available: ${product.stock_quantity}, Requested: ${item.quantity}.` });
        }
        totalAmount += product.price * item.quantity;
      }
      
      // Create the order
      const order = await Order.create({
        customer_id: customerId,
        total_amount: totalAmount,
        payment_status: 'unpaid' // Default status
      }, { transaction: t });

      // Create order items and update stock
      for (const item of items) {
        const product = products.find(p => p.id === item.productId);
        await OrderItem.create({
          order_id: order.id,
          product_id: item.productId,
          quantity: item.quantity,
          unit_price: product!.price
        }, { transaction: t });

        await product!.update({
          stock_quantity: product!.stock_quantity - item.quantity
        }, { transaction: t });
      }

      await t.commit();
      
      // Refetch the full order details to return
      const fullOrder = await Order.findByPk(order.id, {
        include: [
          { model: Customer },
          { 
            model: OrderItem,
            include: [{ model: Product }]
          }
        ]
      });


      res.status(201).json(fullOrder);

    } catch (error: any) {
      await t.rollback();
      res.status(500).json({ error: 'Failed to create order.', message: error.message });
    }
  }

  /**
   * Get all orders
   */
  async getAll(req: Request, res: Response) {
    try {
      const orders = await Order.findAll({ include: [Customer, OrderItem] });
      res.status(200).json(orders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get a single order by ID
   */
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id, { include: [Customer, OrderItem] });
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Mark an order as paid
   */
  async markAsPaid(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      const updatedOrder = await order.update({ payment_status: 'paid' });
      res.status(200).json(updatedOrder);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export const orderController = new OrderController();
