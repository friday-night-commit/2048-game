/* eslint-disable */

import {
  Model,
  Table,
  Column,
  DataType,
} from 'sequelize-typescript';


const { STRING } = DataType;

export interface ITheme {
  id?: number;
  name: string;
}

@Table({
  tableName: 'themes',
})

export default class Theme extends Model<ITheme> {
  @Column({
    type: STRING(1024),
    allowNull: false,
    comment: 'theme name',
  })
  name: string;
}
