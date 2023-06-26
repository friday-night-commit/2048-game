import User, { IUser } from '../models/user.model';

// TODO Почему тут не класс?

const getByYandexId = async (yandexId: number): Promise<User | null> =>
  await User.findOne({ where: { yandexId } });

const createUserFromYandexData = async (data: IUser): Promise<User> =>
  await User.create(data);

export default {
  getByYandexId,
  createUserFromYandexData,
};
