import { DataTypes, Model, ModelAttributes } from 'sequelize';

export const commonFields: ModelAttributes<Model<any, any>> = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
};
