import Comment from './db/models/comment.model';
import Reaction from './db/models/reaction.model';
import Topic from './db/models/topic.model';
import User from './db/models/user.model';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import Theme from './db/models/theme.model';

const isDev = process.env.NODE_ENV === 'development';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env;

const sequelizeOptions: SequelizeOptions = {
  host: isDev ? 'localhost' : 'postgres',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres' // 'mysql', 'sqlite', 'mariadb', 'mssql',
  // models: [__dirname + '/**/*.model.ts'],
};

export const sequelize = new Sequelize(sequelizeOptions);
sequelize.addModels([Comment, Reaction, Topic, User, Theme]);

export async function dbConnect() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: !isDev });
    // eslint-disable-next-line no-console
    console.log('Connection with database has been established successfully.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', error);
  }
}
