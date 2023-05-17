import { FC, Fragment } from 'react';
import { SideBlock } from '../SideBlock';
import { Avatar } from '@material-tailwind/react';
import './index.scss';
import { Comment } from '../../stubs';
import * as moment from 'moment';
import { DATE_FORMATS } from '../../../../Utils/dateFormats';

type TOwnProps = {
  items: Comment[];
  children?: JSX.Element | JSX.Element[];
  isLoading: boolean;
};

type TProps = FC<TOwnProps>;

export const CommentsBlock: TProps = ({
  items,
  children,
  isLoading = true,
}: TOwnProps) => {
  return (
    <SideBlock title='Последние комментарии'>
      <ul>
        {(isLoading ? [...Array(5)] : items).map((obj: Comment, index) => (
          <Fragment key={index}>
            <div className='flex-start user-block'>
              <div>
                {isLoading ? (
                  <span>...Skeleton</span>
                ) : (
                  <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
                )}
              </div>
              {isLoading ? (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <p>...Skeleton</p>
                </div>
              ) : (
                <div className='message'>
                  <span>{obj.user.fullName}</span>
                  <span>{obj.text}</span>
                  <span className='message__date'>
                    {moment(obj.createdAt).format(
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
