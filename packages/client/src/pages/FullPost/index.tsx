import { useParams } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import PageContainer from '../../Components/PageContainer';
import { Post } from './components/Post';
import { CommentsBlock } from '../Forum/components/CommentsBlock';
import { SideBlock } from '../Forum/components/SideBlock';
import { Comment, ForumPost } from '../Forum/stubs';

const LazyTextEditorComponent = React.lazy(
  () => import('../AddPost/components/TextEditor')
);

import './index.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getPostById, STATE_STATUS } from '../../store/slices/Forum';
import {
  createCommentByPostId,
  getCommentsByPostId,
} from '../../store/slices/Comment';

export default function FullPost() {
  const { id } = useParams();
  // const [post, setPost] = useState<ForumPost>();
  const [comments, setComments] = useState<Comment[]>();
  const [post, setPost] = useState<ForumPost>();
  const dispatch = useAppDispatch();

  if (!id) {
    throw new Error('Post id for comment is not found');
  }

  const text = useAppSelector(state => state.commentSlice.commentContent);

  const user = useAppSelector(store => store.userSlice.user);

  useEffect(() => {
    dispatch(getCommentsByPostId(Number(id))).then(data => {
      setComments(data.payload);
    });
    dispatch(getPostById(Number(id)));
  }, []);

  // console.log('comments', comments);

  const onSendComment = async (e: React.FormEvent) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log('comment add', text);

    if (!text) {
      // eslint-disable-next-line no-console
      console.log('Add comment`s text to post  is not found!');
      return;
    }

    const newComment: Comment = {
      user,
      text,
      parentId: undefined,
    };

    dispatch(
      createCommentByPostId({ id: Number(id), comment: newComment })
    ).then(data => {
      setComments([...comments, data.payload]);
    });
  };

  useEffect(() => {
    dispatch(getPostById(Number(id))).then(data => {
      setPost(data.payload);
    });
  }, []);

  const currentPostStatus = useAppSelector(
    store => store.forumSlice.postsStatus
  );

  if (!post) {
    return <h1>Нет данного поста</h1>;
  }
  const isAuthorized = !!user;
  const isEditable = user?.id === post.user?.id;

  return (
    <PageContainer>
      <div className='full-post'>
        {currentPostStatus === STATE_STATUS.LOADING && (
          <p>Загрузка текущего поста</p>
        )}
        <div className='full-post__left'>
          <Post {...post} isFullPost isEditable={isEditable} />
        </div>

        {isAuthorized && (
          <div className='full-post__right'>
            <CommentsBlock items={comments} status={currentPostStatus} />
            <SideBlock title='Оставить комментарий'>
              <div className='full-post__editor'>
                <Suspense fallback={<textarea />}>
                  <LazyTextEditorComponent textAreaHeight={150} />
                </Suspense>
              </div>
            </SideBlock>
          </div>
        )}
        <Button onClick={onSendComment}>Отправить</Button>
      </div>
    </PageContainer>
  );
}
