// src/models/user.ts
import { DataTypes, Sequelize } from 'sequelize';

export const User = (sequelize: Sequelize) => {
  return sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });
};
