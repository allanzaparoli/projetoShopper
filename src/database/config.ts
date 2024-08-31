import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgresql://postgres:postgres@db:5432/mydatabase', {
  dialect: 'postgres',
  logging: false,
});

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};