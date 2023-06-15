import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import './index.scss';
import { UserData } from '../../../Forum/stubs';
import moment from 'moment';
import { DATE_FORMATS } from '../../../../Utils/dateFormats';

type TOwnProps = {
  _id: string;
  title: string;
  createdAt: Date;
  imageUrl: string;
  user: UserData; // Пока нет общего интерфейса
  viewsCount: number;
  commentsCount: number;
  isNew: boolean;
  text: string;
  tags: string[];
  isFullPost?: boolean;
  isLoading?: boolean;
  isEditable: boolean;
};

type TProps = FC<TOwnProps>;

export const Post: TProps = ({
  _id,
  title,
  createdAt,
  text,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  isNew,
  tags,
  isFullPost,
  isLoading,
  isEditable,
}: TOwnProps) => {
  const { id } = useParams();

  const onRemovePost = () => {
    if (window.confirm('Вы действительно хотите удалить статью?')) {
      // dispatch(fetchRemovePost(id));
    }
  };

  if (isLoading) {
    return <h1>...Skeleton</h1>;
  }

  const createdDate = moment(createdAt).format(
    DATE_FORMATS.COMPLEX_DATE_FORMAT
  );

  return (
    <div
      key={_id}
      className='relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full'>
      <div className='shadow p-4 rounded-lg bg-white'>
        {isEditable && (
          <div className='edit-block'>
            <Link className='text-sm' to={`/posts/${id}/edit`}>
              Редактировать
            </Link>
            <button className='remove-btn' onClick={onRemovePost}></button>
          </div>
        )}
        <Link to={`/forum/posts/${_id}`}>
          <div className='flex justify-center relative rounded-lg overflow-hidden h-52'>
            <div className='transition-transform duration-500 transform ease-in-out hover:scale-110 w-full'>
              {imageUrl && (
                <img
                  alt=''
                  src={imageUrl}
                  className='absolute inset-0 bg-black opacity-3'></img>
              )}
            </div>
            <div className='absolute flex justify-center bottom-0 mb-3'>
              <div className='flex bg-white px-4 py-1 space-x-5 rounded-lg overflow-hidden shadow'>
                <p className='flex items-center font-medium text-gray-800'>
                  <span className='views'></span>
                  {viewsCount}
                </p>

                <p className='flex items-center font-medium text-gray-800'>
                  <span className='comments'></span>
                  {commentsCount}
                </p>
              </div>
            </div>

            {isNew && (
              <span className='absolute top-0 left-0 inline-flex mt-3 ml-3 px-3 py-2 rounded-lg z-10 bg-red-500 text-sm font-medium text-white select-none'>
                New
              </span>
            )}
          </div>

          <div className='mt-4'>
            <h2 className='font-medium text-base md:text-lg text-gray-800 line-clamp-1'>
              {title}
            </h2>
            <div className='flex mt-2 text-sm text-gray-800 line-clamp-1'>
              {tags.map((t: string) => (
                <span key={t} className='tag tag-lg'>
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </Link>
        <div className=' gap-4 mt-8'>
          <p className='inline-flex flex-col xl:flex-row xl:items-center text-gray-800'>
            {isFullPost && <span className='mt-2 xl:mt-0'>{text}</span>}
          </p>
          <span className='content-icon'></span>
        </div>

        <div className='grid grid-cols-2 mt-8'>
          <div className='flex items-center'>
            <div className='relative'>
              {user.avatar && (
                <img
                  alt='avatar'
                  src={user.avatar}
                  className='rounded-full w-6 h-6 md:w-8 md:h-8 bg-gray-200'></img>
              )}
              <span className='absolute top-0 right-0 inline-block w-3 h-3 bg-primary-red rounded-full'></span>
            </div>
            <p className='ml-2 text-gray-800 '>{user.fullName}</p>
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
