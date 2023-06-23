import './index.scss';
import { CommentsBlock } from './components/CommentsBlock';

import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from '@material-tailwind/react';
import { ForumPost, lastComments, userData } from './stubs';
import React, { useCallback, useEffect, useState } from 'react';
import PageContainer from '../../Components/PageContainer';
import { TagsBlock } from './components/TagsBlock';
import { Post } from '../FullPost/components/Post';
import { AddPostPage } from '../AddPost';
import ForumController from '../../Controllers/ForumController';
import { useAppSelector } from '../../hooks/redux';

export default function ForumPage() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const [isTagsLoading, setIsTagsLoading] = useState(true);

  const user = useAppSelector(store => store.userSlice.user);
  // eslint-disable-next-line no-console
  console.log('user', user);

  const getPosts = useCallback(async () => {
    const posts = await ForumController.getAllPosts();
    setIsPostsLoading(false);
    return posts;
  }, []);

  const getTags = useCallback(async () => {
    const tags = await ForumController.getAllTags();
    setIsTagsLoading(false);
    return tags;
  }, []);

  useEffect(() => {
    getPosts().then(data => {
      setPosts(data);
    });
  }, []);

  useEffect(() => {
    getTags().then(data => {
      setTags(data);
    });
  }, []);

  const tabsData = [
    {
      label: 'Посты',
      value: 'posts',
      content: (
        <div className='forum'>
          {!posts.length && <p>Нет постов. Создайте новый пост</p>}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full'>
            {(isPostsLoading ? [...Array(5)] : posts).map(obj =>
              isPostsLoading ? (
                <p key={obj?.user?._id}>Skeleton ...</p>
              ) : (
                <Post key={obj?.user?._id} {...obj} isEditable={true} />
              )
            )}
          </div>

          <div className='forum__right'>
            <TagsBlock items={tags} isLoading={isTagsLoading} />
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
    <PageContainer>
      <div className='text-center'>
        <Typography variant='h3' className='mb-8 font-normal md:font-bold'>
          Форум
        </Typography>
      </div>

      <Tabs value='posts' id='posts'>
        <TabsHeader>
          {tabsData.map(({ label, value }) => (
            <Tab id={value} key={value} value={value}>
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
  );
}
