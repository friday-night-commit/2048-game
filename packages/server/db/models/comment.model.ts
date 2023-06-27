import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey, BelongsTo
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
    onDelete: 'CASCADE'
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
  topicId: number;

  @Column({
    field: 'parent_id',
    type: INTEGER,
    allowNull: true,
    comment: 'parent comment id (for replies)',
  })
  parentId: number;
}
