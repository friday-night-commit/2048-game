import { useParams } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import PageContainer from '../../Components/PageContainer';
import { Post } from './components/Post';
import { CommentsBlock } from '../Forum/components/CommentsBlock';
import { SideBlock } from '../Forum/components/SideBlock';
import { Comment, COMMENT_LABEL_TYPE, CONTENT_TYPE, ForumPost } from '../Forum/forum.interfaces';

const LazyTextEditorComponent = React.lazy(
  () => import('../AddPost/components/TextEditor')
);

import './index.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getPostById, STATE_STATUS } from '../../store/slices/Forum';
import {
  clearCommentContent,
  createCommentByPostId,
  getCommentsByPostId,
} from '../../store/slices/Comment';

export default function FullPost() {
  const { id } = useParams();
  const [comments, setComments] = useState<Comment[]>([]);
  const [post, setPost] = useState<ForumPost>();
  const dispatch = useAppDispatch();

  if (!id) {
    throw new Error('Post id for comment is not found');
  }

  const content = useAppSelector(state => state.commentSlice.commentContent);
  const user = useAppSelector(store => store.userSlice.user);

  useEffect(() => {
    dispatch(getCommentsByPostId(Number(id))).then(data => {
      const comments = data.payload as Comment[];
      if(comments.length) {
        setComments(comments);
      }
    });

  }, [id]);

  useEffect(() => {
    dispatch(getPostById(Number(id))).then(data => {
      const post = data.payload as ForumPost;
      if(post){
        setPost(post);
      }
    });

  }, [id]);


  const onSendComment = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!content) {
        return;
      }
      const newComment: Comment = {
        user,
        text: content,
        parentId: undefined,
      };

      dispatch(
        createCommentByPostId({ id: Number(id), comment: newComment })
      ).then(data => {
        const newComment = data.payload as Comment;
        if(newComment){
          setComments([...comments, newComment]);
        }
        dispatch(clearCommentContent());
      });
    },
    [content]
  );

  const currentPostStatus = useAppSelector(
    store => store.forumSlice.postsStatus
  );

  if (!post) {
    return <h1>Нет данного поста</h1>;
  }
  const isAuthorized = !!user;
  const isEditable = user?.id === post.user?.id;
  post.reactionCount = comments.length;

  return (
    <PageContainer>
      <div className='full-post'>
        {currentPostStatus === STATE_STATUS.LOADING && (
          <p>Загрузка текущего поста</p>
        )}
        <div className='full-post__left'>
          <Post {...post} isFullPost isEditable={isEditable}/>
        </div>

        {isAuthorized && (
          <div className='full-post__right'>
            <CommentsBlock title={COMMENT_LABEL_TYPE.POST_COMMENTS} items={comments} status={currentPostStatus} />
            <SideBlock title='Оставить комментарий'>
              <div className='full-post__editor'>
                <Suspense fallback={<textarea />}>
                  <LazyTextEditorComponent
                    textAreaHeight={150}
                    contentType={CONTENT_TYPE.COMMENT}
                  />
                </Suspense>
              </div>
            </SideBlock>
            <Button onClick={onSendComment}>Отправить</Button>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
