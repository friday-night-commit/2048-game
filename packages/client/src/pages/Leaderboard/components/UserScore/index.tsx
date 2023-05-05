import { FC } from 'react';
import { Typography } from '@material-tailwind/react';
import { leaderboardUser } from '../../index';
import './style.scss';

type userScoreProps = {
  user: leaderboardUser;
  className?: string;
};

const UserScore: FC<userScoreProps> = ({ user, className }) => {
  return (
    <div className={`mb-4 p-1 leaderboard__el ${className}`}>
      <Typography variant='h5' className='leaderboard__name font-medium'>
        {user.userImage && (
          <img
            className='leaderboard__image mr-3'
            src={user.userImage}
            alt={user.userName}
          />
        )}
        {user.userName}
      </Typography>
      <Typography variant='h5' className='leaderboard__score font-bold'>
        {user.score}
      </Typography>
    </div>
  );
};

export default UserScore;
