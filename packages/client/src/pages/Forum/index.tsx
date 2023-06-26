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
import { ForumPost, lastComments } from './stubs';
import React, { useEffect, useState } from 'react';
import PageContainer from '../../Components/PageContainer';
import { TagsBlock } from './components/TagsBlock';
import { Post } from '../FullPost/components/Post';
import { AddPostPage } from '../AddPost';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  getAllPosts,
  getAllTags,
  STATE_STATUS,
} from '../../store/slices/Forum';

export default function ForumPage() {
  const [tags, setTags] = useState<string[]>([]);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const dispatch = useAppDispatch();

  const user = useAppSelector(store => store.userSlice.user);

  useEffect(() => {
    dispatch(getAllPosts()).then(data => {
      setPosts(data.payload); //TS2345: Argument of type 'unknown' is not assignable to parameter of type 'SetStateAction '
    });
  }, []);

  useEffect(() => {
    dispatch(getAllTags()).then(data => {
      setTags(data.payload);
    });
  }, []);

  const forumStatus = useAppSelector(store => store.forumSlice.postsStatus);
  const tagsStatus = useAppSelector(store => store.forumSlice.tagsStatus);

  const tabsData = [
    {
      label: 'Посты',
      value: 'posts',
      content: (
        <div className='forum'>
          {forumStatus === STATE_STATUS.Error && <p>Ошибка загрузки постов</p>}
          {!posts?.length && forumStatus === STATE_STATUS.LOADED && (
            <p>Нет постов. Создайте новый пост</p>
          )}
          {forumStatus === STATE_STATUS.LOADING && <p>Загрузка постов</p>}

          {posts?.length && (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full'>
              {posts.map(obj => (
                <Post key={obj?.user?._id} {...obj} isEditable={true} />
              ))}
            </div>
          )}
          <div className='forum__right'>
            <TagsBlock items={tags} status={tagsStatus} />
            <CommentsBlock items={lastComments} status={tagsStatus} />
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
