export const default_avatar = 'https://thumbnail.imgbin.com/10/8/9/imgbin-elon-musk-tesla-motors-tesla-model-3-spacex-tesla-dJ5CpnLwMCeHCuT7A11U0JV38_t.jpg';
export const default_author_name = 'ELon Mask';

type Posts = {
  items: ForumPost[];
  status: string;
};

export enum CONTENT_TYPE {
  POST = 'post',
  COMMENT = 'comment',
}

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
  user: User;
  parentId: number | undefined;
  text: string;
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



