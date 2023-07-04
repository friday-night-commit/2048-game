import User, { IUser } from '../models/user.model';
import Theme from '../models/theme.model';

const getByYandexId = async (yandexId: number): Promise<User | null> => {
  const data = await User.findOne({ where: { yandexId } });
  // @ts-ignore
  data.theme = Theme.findOne({ where: data.themeId } );
  return data;
};

const createUserFromYandexData = async (data: IUser): Promise<User> =>
  await User.create(data);

export default {
  getByYandexId,
  createUserFromYandexData,
};
