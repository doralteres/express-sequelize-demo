import { DataTypes, Sequelize } from 'sequelize';
import { commonFields } from './common';
import { teamsModel } from './teams.model';

export const svcModel = 'services';

const Services = (db: Sequelize) =>
  db.define(svcModel, {
    ...commonFields,
    repoUrl: {
      type: DataTypes.STRING,
      unique: true,
    },
    lang: {
      type: DataTypes.STRING,
    },
    version: {
      type: DataTypes.STRING,
    },
    isInProd: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    cpu: {
      type: DataTypes.DOUBLE,
      defaultValue: 1,
    },
    memory: {
      type: DataTypes.STRING,
      defaultValue: '2Gi',
    },
    ownerId: {
      type: DataTypes.INTEGER,
      references: {
        model: teamsModel,
        key: 'id',
      },
    },
  });

export default Services;
