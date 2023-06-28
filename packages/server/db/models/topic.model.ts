import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  Default, BelongsTo
} from 'sequelize-typescript';

import User from './user.model';

const { STRING, TEXT, INTEGER } = DataType;

export interface ITopic {
  id?: number;
  title: string;
  tag: string;
  text: string;
  viewsCount?: number;
  userId: number;
  imageUrl: string;
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

  @Column({
    type: TEXT,
    allowNull: false,
    comment: 'topic tag',
  })
  declare tag: string;

  @Column({
    type: TEXT,
    allowNull: false,
    comment: 'topic preview',
  })
  declare imageUrl: string;

  @Default(0)
  @Column({
    type: INTEGER,
    allowNull: true,
    comment: 'topic view count',
  })
  declare viewsCount: number;

  @ForeignKey(() => User)
  @Column({
    field: 'user_id',
    type: INTEGER,
    allowNull: false,
    comment: 'topic author id',
    onDelete: 'CASCADE',
  })
  declare userId: number;

 @BelongsTo(() => User, 'user_id')
  declare user: User;
}
