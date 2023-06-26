import { useParams } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import PageContainer from '../../Components/PageContainer';
import { Post } from './components/Post';
import { CommentsBlock } from '../Forum/components/CommentsBlock';
import { SideBlock } from '../Forum/components/SideBlock';
import { ForumPost, lastComments, posts, userData } from '../Forum/stubs';

const LazyTextEditorComponent = lazy(
  () => import('../AddPost/components/TextEditor')
);

import './index.scss';
import useAuth from '../../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAllTags, getPostById, STATE_STATUS } from '../../store/slices/Forum';

export default function FullPost() {
  const { id } = useParams();
  const [post, setPost] = useState<ForumPost>();
  const [user, setUser] = useState<User>();
  const dispatch = useAppDispatch();

  const content =
    useAppSelector(state => state.forumSlice.content) ||
    'заглушка Добавить пост';

  const { getUserData } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    // e.preventDefault();
    // eslint-disable-next-line no-console
    console.log('comment add');
  };

  useEffect(() => {
    dispatch(getPostById(Number(id))).then(data => {
      setPost(data.payload);
    });
  }, []);

  const currentPostStatus = useAppSelector(
    store => store.forumSlice.currentPostStatus
  );

  if (!post) {
    return <h1>Нет данного поста</h1>;
  }
  const isAuthorized = !!user;

  return (
    <PageContainer>

      <div className='full-post'>
        {currentPostStatus === STATE_STATUS.LOADING && <p>Загрузка текущего поста</p>}
        <div className='full-post__left'>
          <Post
            {...post}
            isFullPost
            isEditable={userData?._id === post.user?._id}
          />
        </div>

        {isAuthorized && (
          <div className='full-post__right'>
            <CommentsBlock items={lastComments} status={currentPostStatus} />
            <SideBlock title='Оставить комментарий'>
              <div className='full-post__editor'>
                <Suspense fallback={<textarea />}>
                  <LazyTextEditorComponent textAreaHeight={150} />
                </Suspense>
                <Button onClick={onSubmit}>Отправить</Button>
              </div>
            </SideBlock>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
