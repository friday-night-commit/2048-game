/* eslint-disable */

import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';

import User from './user.model';
import Theme from './theme.model'

const { INTEGER } = DataType;

export interface IThemeUser {
  themeId: number;
  userId: number;
}

@Table({
  tableName: 'theme user connection',
  timestamps: false,
})

export default class ThemeUser extends Model<IThemeUser> {
  @ForeignKey(() => Theme)
  @Column({
    field: 'theme_id',
    type: INTEGER,
    allowNull: false,
    comment: 'theme id',
  })
  themeId: number;

  @ForeignKey(() => User)
  @Column({
    field: 'user_id',
    type: INTEGER,
    allowNull: false,
    comment: 'user using theme id',
  })
  userId: number;
}
