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
import ForumController from '../../Controllers/ForumController';
import { useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/slices/User';

export default function FullPost() {
  const { id } = useParams();
  const [post, setPosts] = useState<ForumPost>();
  const [user, setUser] = useState<User>();
  const content =
    useAppSelector(state => state.forumSlice.content) ||
    'заглушка Добавить пост';

  const [isLoading, setIsLoading] = useState(true);
  const { getUserData } = useAuth();

  const onSubmit = useCallback(async (e: React.FormEvent) => {
    // e.preventDefault();
    // eslint-disable-next-line no-console
    console.log('343333');
  }, []);

  const getPost = useCallback(async () => {
    const post = await ForumController.getPostById(Number(id));
    const user = await getUserData();
    setUser(user);
    setIsLoading(false);
    return post;
  }, [post]);

  useEffect(() => {
    getPost().then(data => {
      // eslint-disable-next-line no-console
      console.log('getPost data', data);
      setPosts(data);
    });
  }, []);

  if (!post) {
    return <h1>Нет данного поста</h1>;
  }
  const isAuthorized = !!user;

  return (
    <PageContainer>
      <div className='full-post'>
        <div className='full-post__left'>
          <Post
            {...post}
            isFullPost
            isEditable={userData?._id === post.user?._id}
          />
        </div>

        {isAuthorized && (
          <div className='full-post__right'>
            <CommentsBlock items={lastComments} isLoading={isLoading} />
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
