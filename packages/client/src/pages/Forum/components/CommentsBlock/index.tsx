import { FC, Fragment } from 'react';
import { SideBlock } from '../SideBlock';
import { Avatar } from '@material-tailwind/react';
import './index.scss';
import { Comment } from '../../stubs';
import moment from 'moment';
import { DATE_FORMATS } from '../../../../Utils/dateFormats';
import { STATE_STATUS } from '../../../../store/slices/Forum';

type TOwnProps = {
  items: Comment[];
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
        {items.map((obj: Comment, index) => (
          <Fragment key={index}>
            <div className='flex-start user-block'>
              <div>
                {status === STATE_STATUS.LOADING ? (
                  <span>...Skeleton</span>
                ) : (
                  <Avatar alt={obj?.user?.fullName} src={obj?.user?.avatarUrl} />
                )}
              </div>
              {status === STATE_STATUS.LOADED &&
                <div className='message'>
                  <span>{obj?.user?.fullName}</span>
                  <span>{obj?.text}</span>
                  <span className='message__date'>
                    {moment(obj?.createdAt).format(
                      DATE_FORMATS.COMPLEX_DATE_FORMAT
                    )}
                  </span>
                </div>
              }

            </div>
            <hr className='solid' />
          </Fragment>
        ))}
        {children}
      </ul>
    </SideBlock>
  );
};
