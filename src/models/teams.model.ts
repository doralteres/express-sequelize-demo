import { DataTypes, Sequelize } from 'sequelize';
import { commonFields } from './common';

export const teamsModel = 'teams';

const Teams = (db: Sequelize) =>
  db.define(teamsModel, {
    ...commonFields,
    department: {
      type: DataTypes.STRING,
    },
  });

export default Teams;
