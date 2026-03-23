// src/models/order.model.ts
import { DataTypes, Model, Sequelize } from 'sequelize';

export class Order extends Model {
  public id!: number;
  public customer_id!: number;
  public order_date!: Date;
  public total_amount!: number;
  public payment_status!: 'paid' | 'unpaid';
}

export default (sequelize: Sequelize) => {
  Order.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.ENUM('paid', 'unpaid'),
      allowNull: false,
      defaultValue: 'unpaid',
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'id',
      }
    }
  }, {
    tableName: 'orders',
    sequelize,
  });

  return Order;
};
