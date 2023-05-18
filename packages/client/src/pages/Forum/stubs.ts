export const posts: Posts = {
  items: [
    {
      _id: '1',
      title: 'Angular + Typescript',
      text: 'My the first post about web',
      tags: ['angular'],
      viewsCount: 1,
      commentsCount: 5,
      isNew: true,
      user: {
        _id: '645279d661497cc4ce589cb8',
        fullName: 'Alexander Laktionov',
        avatar:
          'https://thumbnail.imgbin.com/10/8/9/imgbin-elon-musk-tesla-motors-tesla-model-3-spacex-tesla-dJ5CpnLwMCeHCuT7A11U0JV38_t.jpg',
        email: 'laksan@mail.ru',
      },
      imageUrl:
        'https://assets.toptal.io/images?url=https://bs-uploads.toptal.io/blackfish-uploads/components/blog_post_page/content/cover_image_file/cover_image/1096616/retina_500x200_cover-top-18-most-common-angularjs-developer-mistakes-41f9ad303a51db70e4a5204e101e7414.png',
      createdAt: new Date('2023-11-04T08:24:15.471Z'),
      updatedAt: new Date('2023-05-04T09:24:51.489Z'),
    },
    {
      _id: '2',
      title: 'React + Typescript',
      text:
        'My the second post about web. Декларативный\n' +
        'Создавать интерактивные пользовательские интерфейсы на React — приятно и просто. Вам достаточно описать, как части интерфейса приложения выглядят в разных состояниях. React будет своевременно их обновлять, когда данные изменяются.\n' +
        '\n' +
        'Декларативные представления сделают код более предсказуемым и упростят отладку.\n' +
        '\n' +
        'Основан на компонентах\n' +
        'Создавайте инкапсулированные компоненты с собственным состоянием, а затем объединяйте их в сложные пользовательские интерфейсы.\n' +
        '\n' +
        'Поскольку логика компонента написана на JavaScript, а не содержится в шаблонах, можно с лёгкостью передавать самые разные данные по всему приложению и держать состояние вне DOM.\n' +
        '\n' +
        'Научитесь однажды — пишите где угодно\n' +
        'Нам не нужно ничего знать про остальную часть вашего технологического стека, поэтому вы можете разрабатывать новую функциональность на React, не изменяя существующий код.\n' +
        '\n' +
        'React также может работать на сервере, используя Node.js и на мобильных платформах, используя React Native.',
      tags: ['react', 'javascript'],
      viewsCount: 4,
      commentsCount: 12,
      isNew: true,
      user: {
        _id: '645279d661497cc4ce589cb8',
        fullName: 'Alexander Ivanov',
        email: 'test@mail.ru',
        avatar: 'https://www.casino-king.com/images/articles/elon-musk.jpg',
      },
      imageUrl: 'https://www.itshop.ru/productimages/auto/pimg_2021101_182.png',
      createdAt: new Date('2023-05-10T06:30:51.471Z'),
      updatedAt: new Date('2023-05-04T06:24:51.489Z'),
    },
    {
      _id: '3',
      title: 'Vue + Typescript',
      text: 'My the third post about web',
      tags: ['react', 'typescript'],
      viewsCount: 60,
      commentsCount: 112,
      isNew: false,
      user: {
        _id: '645279d661497cc4ce589cb8',
        fullName: 'Konstantin Petrov',
        email: 'test111@mail.ru',
        avatar: 'https://freesvg.org/img/elon-musk-col.png',
      },
      imageUrl:
        'https://kinsta.com/wp-content/uploads/2021/07/what-to-know-about-vue-js.jpg',
      createdAt: new Date('2023-05-06T06:24:51.471Z'),
      updatedAt: new Date('2023-05-04T06:24:51.489Z'),
    },
  ],
  status: 'loaded',
};

type Posts = {
  items: ForumPost[];
  status: string;
};

export interface ForumPost {
  _id: string;
  title: string;
  text: string;
  tags: string[];
  viewsCount: number;
  commentsCount: number;
  isNew: boolean;
  user: UserData;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export const tags: Tags = {
  items: ['angular', 'react', 'vue', 'javascript', 'typescripts'],
  status: 'loaded',
};

export interface Tags {
  items: string[];
  status: string;
}

export const userData: UserData = {
  _id: '645279d661497cc4ce589cb8',
  fullName: 'Alexander Laktionov',
  email: 'laksan@mail.ru',
  avatar:
    'https://kinsta.com/wp-content/uploads/2021/07/what-to-know-about-vue-js.jpg',
  createdAt: new Date('2023-05-03T15:12:22.276Z'),
  updatedAt: new Date('2023-05-03T15:12:22.276Z'),
};

export interface UserData {
  _id: string;
  fullName: string;
  email: string;
  avatar: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const lastComments: Comment[] = [
  {
    user: {
      fullName: 'Вася Пупкин',
      avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
    },
    text: 'Это тестовый комментарий. Откройте пост и напишите новый комментарий',
    createdAt: new Date('2023-05-04T13:40:28.276Z'),
  },
  {
    user: {
      fullName: 'Иван Иванов',
      avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
    },
    text: 'Это второй тестовый комментарий',
    createdAt: new Date('2023-05-05T13:14:16.276Z'),
  },
];

export interface Comment {
  user: {
    fullName: string;
    avatarUrl: string;
  };
  text: string;
  createdAt: Date;
}
