import React, { FC, Fragment, lazy, Suspense } from 'react';
import { SideBlock } from '../SideBlock';
import { Avatar } from '@material-tailwind/react';
import './index.scss';
import { Comment, default_author_name, default_avatar } from '../../stubs';
import moment from 'moment';
import { DATE_FORMATS } from '../../../../Utils/dateFormats';
import { STATE_STATUS } from '../../../../store/slices/Forum';

const LazyQuillContentComponent = lazy(
  () => import('../../../AddPost/components/QuillContent/index')
);

type TOwnProps = {
  items: Comment[] | undefined;
  children?: JSX.Element | JSX.Element[];
  status: STATE_STATUS;
};

type TProps = FC<TOwnProps>;

export const CommentsBlock: TProps = ({
  items,
  children,
  status,
}: TOwnProps) => {
  return (
    <SideBlock title='Последние комментарии'>
      <ul>
        {!items?.length && <p>Нет комментариев</p>}
        {items &&
          items.map((obj: Comment, index) => (
            <Fragment key={index}>
              <div className='flex-start user-block'>
                <div>
                  {status === STATE_STATUS.LOADING ? (
                    <span>...Skeleton</span>
                  ) : (
                    <Avatar
                      alt={obj?.user?.first_name}
                      src={obj?.user?.avatar || default_avatar}
                    />
                  )}
                </div>
                {status === STATE_STATUS.LOADED && (
                  <div className='message'>
                    <span>{obj?.user?.first_name || default_author_name}</span>
                    <Suspense fallback={<textarea />}>
                    <LazyQuillContentComponent content={obj.text} />
                    </Suspense>
                    <span className='message__date'>
                      {moment(obj?.createdAt).format(
                        DATE_FORMATS.COMPLEX_DATE_FORMAT
                      )}
                    </span>
                  </div>
                )}
              </div>
              <hr className='solid' />
            </Fragment>
          ))}
        {children}
      </ul>
    </SideBlock>
  );
};
