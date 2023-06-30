/* eslint-disable */
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import User from './user.model';
import Topic from './topic.model';
import { INTEGER, TEXT } from 'sequelize';

export interface IReaction {
  id?: number;
  userId: number;
  topicId: number;
}

@Table({
  tableName: 'reactions',
})
export default class Reaction extends Model<IReaction> {
  @Column({
    type: TEXT,
    allowNull: false,
    comment: 'comment content',
  })
  declare text: string;

  @ForeignKey(() => User)
  @Column({
    field: 'user_id',
    type: INTEGER,
    allowNull: false,
    comment: 'comment author id',
    onDelete: 'CASCADE',
  })
  declare userId: number;

  @BelongsTo(() => User, 'user_id')
  declare user: User;

  @ForeignKey(() => Topic)
  @Column({
    field: 'topic_id',
    type: INTEGER,
    allowNull: true,
    comment: 'associated topic id',
  })
  declare topicId: number;

  @BelongsTo(() => Topic, 'topic_id')
  declare topic: Topic;
}
