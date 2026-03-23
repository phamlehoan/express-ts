// src/app/controllers/api/customer.controller.ts
import { Request, Response } from 'express';
import { db } from '@models';

const { Customer } = db;

export class CustomerController {
  /**
   * Get all customers
   */
  async getAll(req: Request, res: Response) {
    try {
      const customers = await Customer.findAll();
      res.status(200).json(customers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get a single customer by ID
   */
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const customer = await Customer.findByPk(id);
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      res.status(200).json(customer);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Create a new customer
   */
  async create(req: Request, res: Response) {
    try {
      const { full_name, phone_number, address } = req.body;
      if (!full_name) {
        return res.status(400).json({ error: 'Full name is required' });
      }
      const newCustomer = await Customer.create({ full_name, phone_number, address });
      res.status(201).json(newCustomer);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Update an existing customer
   */
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { full_name, phone_number, address } = req.body;
      
      const customer = await Customer.findByPk(id);
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }

      const updatedCustomer = await customer.update({ full_name, phone_number, address });
      res.status(200).json(updatedCustomer);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Delete a customer
   */
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const customer = await Customer.findByPk(id);
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      await customer.destroy();
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export const customerController = new CustomerController();
