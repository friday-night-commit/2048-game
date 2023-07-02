import React, { FC, Fragment, lazy, Suspense } from 'react';
import { SideBlock } from '../SideBlock';
import { Avatar } from '@material-tailwind/react';
import './index.scss';
import {
  Comment,
  COMMENT_LABEL_TYPE,
  default_author_name,
  default_avatar,
  default_comment_avatar,
} from '../../forum.interfaces';
import moment from 'moment';
import { DATE_FORMATS } from '../../../../Utils/dateFormats';
import { STATE_STATUS } from '../../../../store/slices/Forum';
import { Link } from 'react-router-dom';

const LazyQuillContentComponent = lazy(
  () => import('../../../AddPost/components/QuillContent/index')
);

type TOwnProps = {
  title: string;
  items: Comment[] | undefined;
  children?: JSX.Element | JSX.Element[];
  status: STATE_STATUS;
};

type TProps = FC<TOwnProps>;

export const CommentsBlock: TProps = ({
  items,
  children,
  status,
  title,
}: TOwnProps) => {
  return (
    <div className='comments-block'>
      <SideBlock title={title}>
        <ul>
          {!items?.length && <p>Нет комментариев</p>}
          {items &&
            items.map((obj: Comment, index) => (
              <Fragment key={index}>
                <Link
                  to={`/forum/posts/${obj.topic?.id}`}
                  className='flex-start user-block'>
                  <div>
                    {status === STATE_STATUS.LOADING ? (
                      <span>...Skeleton</span>
                    ) : (
                      <Avatar
                        alt={obj?.user?.first_name}
                        src={obj?.user?.avatar || default_comment_avatar}
                      />
                    )}
                  </div>
                  {status === STATE_STATUS.LOADED && (
                    <div>
                      <span>{obj?.user?.login || default_author_name}</span>
                      <div className='content'>
                        <Suspense fallback={<textarea />}>
                          <LazyQuillContentComponent
                            content={obj.text}
                            textAreaHeight={90}
                          />
                        </Suspense>
                      </div>
                      <div className='content__footer'>
                        <span className='content__date'>
                          {moment(obj?.createdAt).format(
                            DATE_FORMATS.COMPLEX_DATE_FORMAT
                          )}
                        </span>

                        {title === COMMENT_LABEL_TYPE.LAST_COMMENTS &&
                          obj.topic?.title && (
                            <span className='content__title'>
                              <span>{obj.topic.title}</span>
                            </span>
                          )}
                      </div>
                    </div>
                  )}
                </Link>
                <hr className='solid' />
              </Fragment>
            ))}
          {children}
        </ul>
      </SideBlock>
    </div>
  );
};
