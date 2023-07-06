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
import {
  Comment,
  COMMENT_LABEL_TYPE,
  ForumPost,
  TAB_TYPE
} from './forum.interfaces';
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
import { getLastComments } from '../../store/slices/Comment';
import PostEmpty from '../../Components/PostEmpty';

export default function ForumPage() {
  const [tags, setTags] = useState<string[]>([]);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [lastComments, setLastComments] = useState<Comment[]>([]);
  const [openTab, setOpenTab] = useState<string>(TAB_TYPE.POSTS);

  const dispatch = useAppDispatch();

  const tabName = useAppSelector(state => state.forumSlice.tabName);
  // eslint-disable-next-line no-console
  console.log('tabName', tabName);

  const user = useAppSelector(store => store.userSlice.user);
  useEffect(() => {
    dispatch(getAllPosts()).then(data => {
      const posts = data.payload as ForumPost[];
      if (posts.length) {
        setPosts(posts);
      }
    });
    dispatch(getAllTags()).then(data => {
      const tags = data.payload as string[];
      if (tags.length) {
        setTags(tags);
      }
    });

    dispatch(getLastComments(5)).then(data => {
      const lastComments = data.payload as Comment[];
      if (lastComments.length) {
        setLastComments(lastComments);
      }
    });
  }, []);

  const forumStatus = useAppSelector(store => store.forumSlice.postsStatus);
  const tagsStatus = useAppSelector(store => store.forumSlice.tagsStatus);

  const tabsData = [
    {
      label: 'Посты',
      value: TAB_TYPE.POSTS,
      content:
        !posts.length && forumStatus === STATE_STATUS.LOADED ? (
          <PostEmpty title='Создайте новый пост!' />
        ) : (
          <div className='forum'>
            {forumStatus === STATE_STATUS.Error && (
              <p>Ошибка загрузки постов</p>
            )}
            {forumStatus === STATE_STATUS.LOADING && <p>Загрузка постов</p>}
            {posts?.length && (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full'>
                {posts.map(obj => (
                  <Post
                    key={obj.id}
                    {...obj}
                    isEditable={user?.email === obj.user?.email}
                  />
                ))}
              </div>
            )}
            <div className='forum__right'>
              <TagsBlock items={tags} status={tagsStatus} />
              <CommentsBlock
                title={COMMENT_LABEL_TYPE.LAST_COMMENTS}
                items={lastComments}
                status={tagsStatus}
              />
            </div>
          </div>
        ),
    },
    {
      label: 'Создать новый пост',
      value: TAB_TYPE.ADD_POST,
      content: <AddPostPage backToPosts={() => setOpenTab(TAB_TYPE.POSTS)} />,
    },
  ];

  return (
    <PageContainer>
      <div className='text-center'>
        <Typography variant='h3' className='mb-8 font-normal md:font-bold'>
          Форум
        </Typography>
      </div>
      <Tabs key={openTab} value={openTab} id='posts'>
        <TabsHeader>
          {tabsData.map(({ label, value }) => (
              <Tab key={value} value={value} onClick={() => setOpenTab(value)}>
              <div className='flex items-center gap-2'>{label}</div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}>
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
