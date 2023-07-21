import React, { FC, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import moment from 'moment';
import { DATE_FORMATS } from '../../../../Utils/dateFormats';
import {
  default_avatar, ForumPost
} from '../../../Forum/forum.interfaces';
import { useCSRFToken } from '../../../../hooks/useCSRFToken';
import { useAppDispatch } from '../../../../hooks/redux';
import { deletePost } from '../../../../store/slices/Forum';
import { ReactionBlock } from '../../../../Components/ReactionBlock';
import useAuth from '../../../../hooks/useAuth';

const LazyQuillContentComponent = lazy(
  () => import('../../../AddPost/components/QuillContent/index')
);

interface TOwnProps extends ForumPost {
  isFullPost?: boolean;
}

type TProps = FC<TOwnProps>;
export const Post: TProps = ({
                               id,
                               title,
                               createdAt,
                               text,
                               imageUrl,
                               user,
                               viewsCount,
                               tag,
                               isFullPost,
                             }: TOwnProps) => {

  const token = useCSRFToken();
  const dispatch = useAppDispatch();
  const authUser = useAuth().user;

  const onRemovePost = async () => {
    if (window.confirm('Вы действительно хотите удалить статью?')) {
      id = Number(id);
      dispatch(deletePost({ id, token })).then();
    }
  };

  const createdDate = moment(createdAt).format(
    DATE_FORMATS.COMPLEX_DATE_FORMAT
  );

  const isEditable = (authUser && authUser.email === user?.email);

  const isNew =
    moment(createdAt).format(DATE_FORMATS.SIMPLE_DATE_FORMAT) ===
    moment().format(DATE_FORMATS.SIMPLE_DATE_FORMAT);
  return (
    <div
      key={id}
      className='relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full'>
      <div className='shadow p-4 rounded-lg bg-white'>
        {(isEditable && !isFullPost) && (
          <div className='edit-block'>
            <Link className='text-sm' to={`/posts/${id}/edit`}>
              Редактировать
            </Link>
            <button className='remove-btn' onClick={onRemovePost}></button>
          </div>
        )}
        <Link to={`/forum/posts/${id}`}>
          <div className='flex justify-center relative rounded-lg overflow-hidden img-block'>
            <div
              className='transition-transform duration-500 transform ease-in-out hover:scale-10 w-full '>
              {imageUrl && (
                <img
                  alt=''
                  src={imageUrl}
                  className='absolute inset-0 bg-black opacity-3'></img>
              )}
            </div>
            <div className='absolute flex justify-center bottom-0 mb-3 '>
              <div className='flex bg-white px-4 py-1 space-x-5 rounded-lg overflow-hidden shadow'>
                <p className='flex items-center font-medium text-gray-800'>
                  <span className='views'></span>
                  {viewsCount}
                </p>
                {isFullPost &&<p className='flex items-center font-medium text-gray-800 w-50px'
                   style={{ width: 50 }}>
                  {id && <ReactionBlock topicId={id} />}
                </p>}
              </div>
            </div>

            {isNew && (
              <span
                className='absolute top-0 left-0 inline-flex mt-3 ml-3 px-3 py-2 rounded-lg z-10 bg-red-500 text-sm font-medium text-white select-none'>
                New
              </span>
            )}
          </div>

          <div className='mt-4'>
            <h2 className='font-medium text-base md:text-lg text-gray-800 line-clamp-1'>
              {title}
            </h2>
            <div className='flex mt-2 text-sm text-gray-800 line-clamp-1'>
              <span className='tag tag-lg'>#{tag}</span>
            </div>
          </div>
        </Link>
        <div className=' gap-4 mt-8'>
          <p className='flex-col xl:flex-row xl:items-center text-gray-800'>
            {isFullPost && (
              <Suspense fallback={<textarea />}>
                <LazyQuillContentComponent
                  content={text}
                  textAreaHeight={300}
                />
              </Suspense>
            )}
          </p>
          <span className='content-icon'></span>
        </div>

        <div className='grid grid-cols-2 mt-8'>
          <div className='flex items-center'>
            <div className='relative'>
              {user && (
                <img
                  alt='avatar'
                  src={user?.avatar || default_avatar}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src=default_avatar;
                  }}
                  className='rounded-full w-6 h-6 md:w-8 md:h-8 bg-gray-200'></img>
              )}
              <span className='absolute top-0 right-0 inline-block w-3 h-3 bg-primary-red rounded-full'></span>
            </div>
            <p className='ml-2 text-gray-800 '>{user?.login}</p>
          </div>

          <div className='flex justify-end'>
            <p className='inline-block font-semibold text-primary whitespace-nowrap leading-tight rounded-xl'>
              <span className='text-lg'>{createdDate}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
