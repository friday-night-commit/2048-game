import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import './index.scss';
import { UserData } from '../Forum/stubs';
import * as moment from 'moment';
import { DATE_FORMATS } from '../../Utils/dateFormats';

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
}) => {
  const { id } = useParams();

  const onRemovePost = () => {
    if (window.confirm('Вы действительно хотите удалить статью?')) {
      // dispatch(fetchRemovePost(id));
    }
  };

  if (isLoading) {
    return <h1>...Skeleton</h1>;
  }

  const createdDate = moment(createdAt).format(DATE_FORMATS.COMPLEX_DATE_FORMAT);

  return (
    <a
      href={`/posts/${_id}`}
      className="relative inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
      <div className="shadow p-4 rounded-lg bg-white">
        {isEditable && (
          <div className="edit-block">
            <Link className="text-sm" to={`/posts/${id}/edit`}>
              Редактировать
            </Link>
            <button onClick={onRemovePost}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="red">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        )}

        <div className="flex justify-center relative rounded-lg overflow-hidden h-52">
          <div className="transition-transform duration-500 transform ease-in-out hover:scale-110 w-full">
            {imageUrl && (
              <img
                alt=''
                src={imageUrl}
                className="absolute inset-0 bg-black opacity-3"></img>
            )}
          </div>
          <div className="absolute flex justify-center bottom-0 mb-3">
            <div className="flex bg-white px-4 py-1 space-x-5 rounded-lg overflow-hidden shadow">
              <p className="flex items-center font-medium text-gray-800">
                <svg
                  className="w-5 h-5 fill-current mr-2"
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  height="1em"
                  width="1em">
                  <path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" />
                </svg>
                {viewsCount}
              </p>

              <p className="flex items-center font-medium text-gray-800">
                <svg
                  className="w-5 h-5 fill-current mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="1em"
                  width="1em">
                  <path d="M12 2C6.486 2 2 5.589 2 10c0 2.908 1.898 5.515 5 6.934V22l5.34-4.005C17.697 17.852 22 14.32 22 10c0-4.411-4.486-8-10-8zm0 14h-.333L9 18v-2.417l-.641-.247C5.67 14.301 4 12.256 4 10c0-3.309 3.589-6 8-6s8 2.691 8 6-3.589 6-8 6z" />
                  <path d="M8 9h8v2H8z" />
                </svg>
                {commentsCount}
              </p>
            </div>
          </div>

          {isNew && (
            <span className="absolute top-0 left-0 inline-flex mt-3 ml-3 px-3 py-2 rounded-lg z-10 bg-red-500 text-sm font-medium text-white select-none">
              New
            </span>
          )}
        </div>

        <div className="mt-4">
          <h2 className="font-medium text-base md:text-lg text-gray-800 line-clamp-1">
            {title}
          </h2>
          <div className="flex mt-2 text-sm text-gray-800 line-clamp-1">
            {tags.map((t: string) => (
              <span className="tag tag-lg">#{t}</span>
            ))}
          </div>
        </div>

        <div className=" gap-4 mt-8">
          <p className="inline-flex flex-col xl:flex-row xl:items-center text-gray-800">
            <svg
              className="w-5 h-5 fill-current mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1em"
              width="1em">
              <path
                d="M10.0769 22.5C10.0769 21.6716 10.7485 21 11.5769 21H22.4231C23.2515 21 23.9231 21.6716 23.9231 22.5C23.9231 23.3284 23.2515 24 22.4231 24H11.5769C10.7485 24 10.0769 23.3284 10.0769 22.5ZM10.0769 17C10.0769 16.1716 10.7485 15.5 11.5769 15.5H22.4231C23.2515 15.5 23.9231 16.1716 23.9231 17C23.9231 17.8284 23.2515 18.5 22.4231 18.5H11.5769C10.7485 18.5 10.0769 17.8284 10.0769 17ZM10.0769 11.5C10.0769 10.6716 10.7485 10 11.5769 10H22.4231C23.2515 10 23.9231 10.6716 23.9231 11.5C23.9231 12.3284 23.2515 13 22.4231 13H11.5769C10.7485 13 10.0769 12.3284 10.0769 11.5ZM18 7H10C8.34315 7 7 8.34315 7 10V18H3C1.34315 18 0 16.6569 0 15V3C0 1.34315 1.34315 0 3 0H15C16.6569 0 18 1.34315 18 3V7Z"
                fill="#758CA3"
              />
            </svg>
            {isFullPost && <span className="mt-2 xl:mt-0">{text}</span>}
          </p>
        </div>

        <div className="grid grid-cols-2 mt-8">
          <div className="flex items-center">
            <div className="relative">
              {user.avatar && (
                <img
                  src={user.avatar}
                  className="rounded-full w-6 h-6 md:w-8 md:h-8 bg-gray-200"></img>
              )}
              <span className="absolute top-0 right-0 inline-block w-3 h-3 bg-primary-red rounded-full"></span>
            </div>

            <p className="ml-2 text-gray-800 ">{user.fullName}</p>
          </div>

          <div className="flex justify-end">
            <p className="inline-block font-semibold text-primary whitespace-nowrap leading-tight rounded-xl">
              <span className="text-lg">{createdDate}</span>
            </p>
          </div>
        </div>
      </div>
    </a>
  );
};
