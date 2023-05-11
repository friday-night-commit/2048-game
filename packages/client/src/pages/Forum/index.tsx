import './index.scss';
import { CommentsBlock } from './components/CommentsBlock';
import { RouterProvider } from 'react-router-dom';

import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from '@material-tailwind/react';
import { lastComments, posts, tags, userData } from './stubs';
import React from 'react';
import PageContainer from '../../Components/PageContainer';
import { TagsBlock } from './components/TagsBlock';
import { Post } from '../Post';
import { AddPostPage } from '../AddPost';
import { forumRoutes } from './router';

export default function ForumPage() {
  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  const tabsData = [
    {
      label: 'Посты',
      value: 'posts',
      content: (

        <div className='forum'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full'>
            {(isPostsLoading ? [...Array(5)] : posts.items).map(obj =>
              isPostsLoading ? (
                <p>Skeleton ...</p>
              ) : (
                <Post {...obj} isEditable={userData?._id === obj.user._id} />
              )
            )}
          </div>

          <div className='forum__right'>
            <TagsBlock items={tags.items} isLoading={isTagsLoading} />
            <CommentsBlock items={lastComments} isLoading={false} />
          </div>
        </div>

      ),
    },
    {
      label: 'Создать новый пост',
      value: 'add-post',
      content: <AddPostPage />,
    },
  ];

  return (
    <RouterProvider router={forumRoutes}>
      <PageContainer>
        <div className='text-center'>
          <Typography variant='h3' className='mb-8 font-normal md:font-bold'>
            Форум
          </Typography>
        </div>

        <Tabs value='posts'>
          <TabsHeader>
            {tabsData.map(({ label, value }) => (
              <Tab key={value} value={value}>
                <div className='flex items-center gap-2'>{label}</div>
              </Tab>
            ))}
          </TabsHeader>

          <TabsBody>

            {tabsData.map(({ value, content }) => (
              <TabPanel key={value} value={value}>
                {content}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </PageContainer>
    </RouterProvider>
  );
}
