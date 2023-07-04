import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Umzug, SequelizeStorage } from 'umzug';

const isDev = process.env.NODE_ENV === 'development';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env;

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres', // 'mysql', 'sqlite', 'mariadb', 'mssql',
  models: [__dirname + '/**/*.model.ts'],
};

export const sequelize = new Sequelize(sequelizeOptions);
const umzug = new Umzug({
  migrations: { glob: 'migrations/*.ts' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

export type Migration = typeof umzug._types.migration;

export async function dbConnect() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(isDev ? { force: true } : {});
    await umzug.up();

    // eslint-disable-next-line no-console
    console.log('Connection with database has been established successfully.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', error);
  }
}
