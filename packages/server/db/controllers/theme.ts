import Theme, { ITheme } from '../models/theme.model';

async function createTheme(
  name: string,
): Promise<Theme | null> {
  return await Theme.create({ name });
}

async function updateThemeById(theme: ITheme): Promise<[affectedCount: number]> {
  return await Theme.update(theme, { where: { id: theme.id } });
}

async function deleteThemeById(id: number): Promise<number> {
  return await Theme.destroy({ where: { id } });
}

async function getThemeById(id: number): Promise<Theme | null> {
  return await Theme.findOne({ where: { id } });
}

async function getAllThemes(): Promise<Theme[]> {
  return await Theme.findAll();
}

export default {
  createTheme,
  updateThemeById,
  deleteThemeById,
  getThemeById,
  getAllThemes
};
