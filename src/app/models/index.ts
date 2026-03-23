// src/app/models/index.ts
import { Sequelize } from 'sequelize';
import { sequelize } from '@configs/database';

// Import model definition functions
import initCategoryModel, { Category } from './category.model';
import initProductModel, { Product } from './product.model';
import initCustomerModel, { Customer } from './customer.model';
import initOrderModel, { Order } from './order.model';
import initOrderItemModel, { OrderItem } from './order-item.model';

// Initialize models
const models = {
  Category: initCategoryModel(sequelize),
  Product: initProductModel(sequelize),
  Customer: initCustomerModel(sequelize),
  Order: initOrderModel(sequelize),
  OrderItem: initOrderItemModel(sequelize),
};

// Define associations
// Category <-> Product
models.Category.hasMany(models.Product, { foreignKey: 'category_id' });
models.Product.belongsTo(models.Category, { foreignKey: 'category_id' });

// Customer <-> Order
models.Customer.hasMany(models.Order, { foreignKey: 'customer_id' });
models.Order.belongsTo(models.Customer, { foreignKey: 'customer_id' });

// Order <-> OrderItem
models.Order.hasMany(models.OrderItem, { foreignKey: 'order_id' });
models.OrderItem.belongsTo(models.Order, { foreignKey: 'order_id' });

// Product <-> OrderItem
models.Product.hasMany(models.OrderItem, { foreignKey: 'product_id' });
models.OrderItem.belongsTo(models.Product, { foreignKey: 'product_id' });

export const db = {
  sequelize,
  Sequelize,
  ...models,
};

export const syncDb = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("An error occurred while synchronizing the models:", error);
  }
};
