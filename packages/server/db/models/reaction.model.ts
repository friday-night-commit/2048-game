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
import { INTEGER, STRING } from 'sequelize';

export const enum REACTION_TYPE {
  LIKE = 'Like',
  LOVE = 'Love',
  HAHA = 'Haha',
  WOW = 'Wow',
  SAD = 'Sad',
  ANGRY = 'Angry',
}
export interface IReaction {
  id?: number;
  userId: number;
  topicId: number;
  type: REACTION_TYPE;
}


@Table({
  tableName: 'reactions',
})
export default class Reaction extends Model<IReaction> {
  @Column({
    type: STRING,
    allowNull: true,
    comment: 'reaction type',
  })
  declare type: REACTION_TYPE;

  @ForeignKey(() => User)
  @Column({
    field: 'user_id',
    type: INTEGER,
    allowNull: false,
    comment: 'reaction author id',
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
