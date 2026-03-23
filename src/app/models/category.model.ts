// src/models/category.model.ts
import { DataTypes, Model, Sequelize } from 'sequelize';

export class Category extends Model {
  public id!: number;
  public name!: string;
}

export default (sequelize: Sequelize) => {
  Category.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'categories',
    sequelize,
  });

  return Category;
};
