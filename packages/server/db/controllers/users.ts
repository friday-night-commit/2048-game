import User, { IUser } from '../models/user.model';

const getByYandexId = (yandexId: number): Promise<User | null> =>
  User.findOne({ where: { yandexId } });

const createUserFromYandexData = async (data: IUser): Promise<User> =>
  User.create(data);

export default {
  getByYandexId,
  createUserFromYandexData,
};
