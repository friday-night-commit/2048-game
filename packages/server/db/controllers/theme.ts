import Theme from '../models/theme.model';
import ThemeUser from '../models/themeuser.model';

async function createTheme(
  name: string,
): Promise<Theme | null> {
  return await Theme.create({ name });
}

async function updateThemeById(themeName: string, themeId: number): Promise<[affectedCount: number]> {
  return await Theme.update({ name: themeName }, { where: { id: themeId } });
}

async function deleteThemeById(id: number): Promise<number> {
  return await Theme.destroy({ where: { id } });
}

async function getThemeById(id: number): Promise<Theme | null> {
  return await Theme.findOne({ where: { id } });
}

async function getThemeByName(name: string): Promise<Theme | null> {
  return await Theme.findOne({ where: { name: name } });
}

async function getAllThemes(): Promise<Theme[]> {
  return await Theme.findAll();
}

async function createThemeUserLink(
  themeId: number,
  userId: number,
): Promise<ThemeUser | null> {
  return await ThemeUser.create({ themeId, userId });
}

async function getThemeByUser(userId: number): Promise<ThemeUser | null> {
  return await ThemeUser.findOne({ where: { userId: userId } });
}

async function updateThemeForUser(themeId: number, userId: number): Promise<[affectedCount: number]> {
  return await ThemeUser.update({ themeId: themeId }, { where: { userId: userId } });
}

async function deleteThemeUserByThemeId(themeId: number): Promise<number> {
  return await ThemeUser.destroy({ where: { themeId: themeId } });
}

export default {
  createTheme,
  updateThemeById,
  deleteThemeById,
  getThemeById,
  getThemeByName,
  getAllThemes,
  createThemeUserLink,
  getThemeByUser,
  updateThemeForUser,
  deleteThemeUserByThemeId,
};
