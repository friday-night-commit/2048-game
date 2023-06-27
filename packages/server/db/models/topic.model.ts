 /* eslint-disable */

 import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';

import User from './user.model';

const { STRING, TEXT, INTEGER } = DataType;

export interface ITopic {
  id?: number;
  title: string;
  text: string;
  userId: number;
}

@Table({
  tableName: 'topics',
})
export default class Topic extends Model<ITopic> {
  @Column({
    type: STRING(1024),
    allowNull: false,
    comment: 'topic title',
  })
  declare title: string;

  @Column({
    type: TEXT,
    allowNull: false,
    comment: 'topic content',
  })
  declare text: string;

  @ForeignKey(() => User)
  @Column({
    field: 'user_id',
    type: INTEGER,
    allowNull: false,
    comment: 'topic author id',
    onDelete: 'CASCADE',
  })
  declare userId: number;
}
