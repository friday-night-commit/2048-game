/* eslint-disable */

import {
  Model,
  Table,
  Column,
  DataType,
} from 'sequelize-typescript';


const { INTEGER, STRING } = DataType;

export interface ITheme {
  id: number;
  name: string;
}

@Table({
  tableName: 'themes',
  timestamps: false,
})
export default class Theme extends Model<ITheme> {
  @Column({
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({
    type: STRING(1024),
    allowNull: false,
    comment: 'theme name',
  })
  name: string;
}
