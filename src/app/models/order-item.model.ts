// src/models/order-item.model.ts
import { DataTypes, Model, Sequelize } from 'sequelize';

export class OrderItem extends Model {
  public id!: number;
  public order_id!: number;
  public product_id!: number;
  public quantity!: number;
  public unit_price!: number;
}

export default (sequelize: Sequelize) => {
  OrderItem.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id',
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      }
    }
  }, {
    tableName: 'order_items',
    sequelize,
  });

  return OrderItem;
};
