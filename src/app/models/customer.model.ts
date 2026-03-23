// src/models/customer.model.ts
import { DataTypes, Model, Sequelize } from 'sequelize';

export class Customer extends Model {
  public id!: number;
  public full_name!: string;
  public phone_number!: string;
  public address!: string;
}

export default (sequelize: Sequelize) => {
  Customer.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    phone_number: {
      type: new DataTypes.STRING(20),
      allowNull: true,
      unique: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'customers',
    sequelize,
  });

  return Customer;
};
