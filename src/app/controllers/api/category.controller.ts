// src/app/controllers/api/category.controller.ts
import { Request, Response } from 'express';
import { db } from '@models';

const { Category } = db;

export class CategoryController {
  /**
   * Get all categories
   */
  async getAll(req: Request, res: Response) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Create a new category
   */
  async create(req: Request, res: Response) {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'Category name is required' });
      }
      const newCategory = await Category.create({ name });
      res.status(201).json(newCategory);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export const categoryController = new CategoryController();
