import Theme from '../models/theme.model';
import User from '../models/user.model';

async function getThemeById(id: number): Promise<Theme | null> {
  return await Theme.findOne({ where: { id } });
}

async function getThemeByName(name: string): Promise<Theme | null> {
  return await Theme.findOne({ where: { name: name } });
}

async function getThemeByUser(userId: number): Promise<Theme | null> {
  const user = await User.findOne({ where: { yandexId: userId } });
  return await Theme.findOne({
    where: { id: user!.themeId }
  });
}

async function fillTable(): Promise<Theme[]> {
  return await Theme.bulkCreate([
    { name: 'light' },
    { name: 'dark' }
  ]);
}

async function updateThemeForUser(themeId: number, userId: number): Promise<[affectedCount: number]> {
  return await User.update({ themeId: themeId }, { where: { yandexId: userId } });
}

export default {
  getThemeById,
  getThemeByName,
  getThemeByUser,
  updateThemeForUser,
  fillTable
};
