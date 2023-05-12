import { lastComments, posts, userData } from '../Forum/stubs';
import PageContainer from '../../Components/PageContainer';
import { useParams } from 'react-router-dom';
import { Post } from './components/Post';
import React from 'react';
import './index.scss';
import { CommentsBlock } from '../Forum/components/CommentsBlock';
import { SideBlock } from '../Forum/components/SideBlock';
import { TextEditor } from '../AddPost/components/TextEditor';
import { Button } from '@material-tailwind/react';

export default function FullPost() {
  const { id } = useParams();
  const post = posts.items.find(postItem => postItem._id === id);
  if (!post) {
    return <h1>Нет данного поста</h1>;
  }
  const isAuthorized = true;
  const isLoading = false;
  return (
    <PageContainer>
      <div className="full-post">
        <div className="full-post__left">
          <Post
            _id={post._id}
            title={post.title}
            imageUrl={post.imageUrl}
            user={post.user}
            createdAt={post.createdAt}
            viewsCount={post.viewsCount}
            commentsCount={post.commentsCount}
            text={post.text}
            tags={post.tags}
            isNew={post.isNew}
            isFullPost={true}
            isEditable={userData?._id === post.user._id}
          />
        </div>
        {isAuthorized && (
          <div className="full-post__right">
            <CommentsBlock
              items={lastComments}
              isLoading={isLoading}></CommentsBlock>

            <SideBlock title="Оставить комментарий">
              <div className="full-post__editor">
                <TextEditor textAreaHeight={100}></TextEditor>
                <Button>Отправить</Button>
              </div>
            </SideBlock>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
