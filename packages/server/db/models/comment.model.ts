/* eslint-disable */

import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';

import User from './user.model';
import Topic from './topic.model';

const { TEXT, INTEGER } = DataType;

export interface IComment {
  id?: number;
  text: string;
  userId: number;
  topicId: number;
  parentId: number | null;
}

@Table({
  tableName: 'comments',
})
export default class Comment extends Model<IComment> {
  @Column({
    type: TEXT,
    allowNull: false,
    comment: 'comment content',
  })
  text: string;

  @ForeignKey(() => User)
  @Column({
    field: 'user_id',
    type: INTEGER,
    allowNull: false,
    comment: 'comment author id',
  })
  userId: number;

  @ForeignKey(() => Topic)
  @Column({
    field: 'topic_id',
    type: INTEGER,
    allowNull: true,
    comment: 'associated topic id',
  })
  topicId: number;

  @Column({
    field: 'parent_id',
    type: INTEGER,
    allowNull: true,
    comment: 'parent comment id (for replies)',
  })
  parentId: number;
}