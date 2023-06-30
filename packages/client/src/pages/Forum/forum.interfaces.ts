import { REACTION_TYPE } from '../../Components/ReactionBlock';

export const default_avatar =
  'https://thumbnail.imgbin.com/10/8/9/imgbin-elon-musk-tesla-motors-tesla-model-3-spacex-tesla-dJ5CpnLwMCeHCuT7A11U0JV38_t.jpg';
export const default_comment_avatar =
  'https://big-i.ru/upload/iblock/471/8xe3vim9p8f8ori1o3ert3tgts25ira9.jpg';
export const default_author_name = 'ELon Mask';

export enum CONTENT_TYPE {
  POST = 'post',
  COMMENT = 'comment',
}

export enum TAB_TYPE {
  POSTS = 'posts',
  ADD_POST = 'add-post',
}

export enum COMMENT_LABEL_TYPE {
  LAST_COMMENTS = 'Последние комментарии',
  POST_COMMENTS = 'Комментарии поста',
}

export type ImgResponse = { url: string };

export interface ForumPost {
  id?: number;
  title: string;
  text: string;
  tag: string;
  viewsCount?: number;
  commentsCount?: number;
  isNew?: boolean;
  user?: User;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Comment {
  id?: number;
  user?: User;
  parentId: number | undefined;
  text: string;
  topic?: ForumPost;
  createdAt?: Date;
}

export interface Reaction {
  id?: number;
  user?: User;
  type: REACTION_TYPE;
  topic?: ForumPost;
  createdAt?: Date;
}

export interface LastComment {
  id?: number;
  text: string;
  user: User;
  postTitle: string;
  parentId: number;
  createdAt?: Date;
}
