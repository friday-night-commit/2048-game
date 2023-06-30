import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
// import dotenv from 'dotenv';

// dotenv.config({path: __dirname + '../../.env'});

const isDev = process.env.NODE_ENV === 'development';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env;
// eslint-disable-next-line no-console
console.log(
  '=====>>>>>>>>>',
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT
);

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  dialect: 'postgres', // 'mysql', 'sqlite', 'mariadb', 'mssql',
  models: [__dirname + '/**/*.model.ts'],
};

export const sequelize = new Sequelize(sequelizeOptions);

export async function dbConnect() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(isDev ? { force: false } : {});
    // eslint-disable-next-line no-console
    console.log('Connection with database has been established successfully.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', error);
  }
}
