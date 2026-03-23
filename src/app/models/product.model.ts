// src/models/product.model.ts
import { DataTypes, Model, Sequelize } from 'sequelize';

export class Product extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public stock_quantity!: number;
  public category_id!: number;
}

export default (sequelize: Sequelize) => {
  Product.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      }
    }
  }, {
    tableName: 'products',
    sequelize,
  });

  return Product;
};
