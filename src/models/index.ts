import { Sequelize } from 'sequelize';
import Teams from './teams.model';
import Services from './services.model';

export const DB = async (): Promise<Sequelize> => {
  return new Promise(async (res, rej) => {
    const sequelize = new Sequelize('sqlite::memory:');
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      res(sequelize);
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      rej(error);
    }
  });
};

export const createModels = (sequelize: Sequelize): Sequelize => {
  try {
    // MODELS
    const teams = Teams(sequelize);
    const services = Services(sequelize);

    // DB Relations & Conections
    teams.hasMany(services);
    services.belongsTo(teams);

    return sequelize;
  } catch (error) {
    console.error('Failure on init db models:', error);
    throw new Error(error);
  }
};
