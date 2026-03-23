// src/app/controllers/api/product.controller.ts
import { Request, Response } from 'express';
import { db } from '@models';

const { Product, Category } = db;

export class ProductController {
  /**
   * Get all products
   */
  async getAll(req: Request, res: Response) {
    try {
      const products = await Product.findAll({ include: [Category] });
      res.status(200).json(products);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get a single product by ID
   */
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id, { include: [Category] });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Create a new product
   */
  async create(req: Request, res: Response) {
    try {
      const { name, price, stock_quantity, category_id } = req.body;
      if (!name || !price || !category_id) {
        return res.status(400).json({ error: 'Name, price, and category_id are required' });
      }
      const newProduct = await Product.create({ name, price, stock_quantity, category_id });
      res.status(201).json(newProduct);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Update an existing product
   */
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, price, stock_quantity, category_id } = req.body;
      
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const updatedProduct = await product.update({ name, price, stock_quantity, category_id });
      res.status(200).json(updatedProduct);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Delete a product
   */
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      await product.destroy();
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export const productController = new ProductController();
