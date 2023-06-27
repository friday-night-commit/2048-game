export const default_avatar = 'https://thumbnail.imgbin.com/10/8/9/imgbin-elon-musk-tesla-motors-tesla-model-3-spacex-tesla-dJ5CpnLwMCeHCuT7A11U0JV38_t.jpg';
export const default_author_name = 'ELon Mask';

type Posts = {
  items: ForumPost[];
  status: string;
};

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

export const lastComments: Comment[] = [
  {
    user: {
      id: 1,
      first_name: 'Ivan',
      second_name: 'Ivanov',
      display_name: 'Ivan01',
      login: 'Ivan',
      email: 'test2@mai.ru',
      phone: '+488484885',
      avatar: 'https://mui.com/static/images/avatar/1.jpg',
    },
    text: 'Это тестовый комментарий. Откройте пост и напишите новый комментарий',
    createdAt: new Date('2023-05-04T13:40:28.276Z'),
    parentId: 2,
  },
  {
    user: {
      id: 2,
      first_name: 'Alex',
      second_name: 'Alexeev',
      display_name: 'Alex01',
      login: 'Alex',
      email: 'test1@mai.ru',
      phone: '+849191515',
      avatar: 'https://mui.com/static/images/avatar/2.jpg',
    },
    text: 'Это второй тестовый комментарий',
    parentId: 1,
    createdAt: new Date('2023-05-05T13:14:16.276Z'),
  },
];

export interface Comment {
  id?: number;
  user: User | undefined
  parentId: number | undefined;
  text: string;
  createdAt?: Date;
}
