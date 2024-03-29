/* eslint-disable */

import { Model, Table, Column, DataType, ForeignKey, BelongsTo, Default } from 'sequelize-typescript'
import Theme from './theme.model'

const { STRING, INTEGER } = DataType;

export interface IUser {
  id: number;
  yandexId: number;
  firstName: string;
  secondName: string;
  displayName: string;
  email: string;
  avatar: string;
  phone: string;
  login: string;
  themeId: number;
}

@Table({
  tableName: 'users',
  timestamps: false,
})
export default class User extends Model<IUser> {
  @Column({
    type: INTEGER,
    allowNull: false,
    comment: 'user yandex ID',
  })
  yandexId: number;

  @Column({
    field: 'first_name',
    type: STRING(1024),
    allowNull: true,
    comment: 'user first name',
  })
  firstName: string;

  @Column({
    field: 'second_name',
    type: STRING(1024),
    allowNull: true,
    comment: 'user second name',
  })
  secondName: string;

  @Column({
    field: 'display_name',
    type: STRING(1024),
    allowNull: true,
    comment: 'user display name',
  })
  displayName: string;

  @Column({
    type: STRING(1024),
    allowNull: false,
    comment: 'user email',
  })
  email: string;

  @Column({
    type: STRING(1024),
    allowNull: true,
    comment: 'user phone',
  })
  phone: string;

  @Column({
    type: STRING(1024),
    allowNull: true,
    comment: 'path to user avatar',
  })
  avatar: string;

  @Column({
    type: STRING(1024),
    allowNull: false,
    comment: 'user login',
  })
  login: string;

  @Default(1)
  @ForeignKey(() => Theme)
  @Column({
    field: 'theme_id',
    type: INTEGER,
    allowNull: false,
    comment: 'theme id',
    onDelete: 'CASCADE',
  })
  declare themeId: number;
  @BelongsTo(() => Theme, 'theme_id')
  declare theme: Theme;
}
