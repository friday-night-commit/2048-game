import { useParams } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

import PageContainer from '../../Components/PageContainer';
import { Post } from './components/Post';
import { CommentsBlock } from '../Forum/components/CommentsBlock';
import { SideBlock } from '../Forum/components/SideBlock';
import { lastComments, posts, userData } from '../Forum/stubs';
// import TextEditor from '../AddPost/components/TextEditor';

import './index.scss';

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
      <div className='full-post'>
        <div className='full-post__left'>
          <Post
            {...post}
            isFullPost
            isEditable={userData?._id === post.user._id}
          />
        </div>
        {isAuthorized && (
          <div className='full-post__right'>
            <CommentsBlock items={lastComments} isLoading={isLoading} />

            <SideBlock title='Оставить комментарий'>
              <div className='full-post__editor'>
                {/* <TextEditor textAreaHeight={100} /> */}
                <textarea />
                <Button>Отправить</Button>
              </div>
            </SideBlock>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
