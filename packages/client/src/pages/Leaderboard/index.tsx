import { useCallback, useEffect, useState } from 'react';
import { Typography } from '@material-tailwind/react';
import PageContainer from '../../Components/PageContainer';
import UserScore from './components/UserScore';
import Preloader from '../../Components/Preloader';
import LeaderboardController from '../../Controllers/LeaderboardController';
import { Link } from 'react-router-dom';
import routes from '../../routes';

type pagination = {
  limit: number;
  cursor: number;
};

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<leaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState<pagination>({
    limit: 100,
    cursor: 0,
  });

  const getLeaderboard = useCallback(async () => {
    const leaderboardData = await LeaderboardController.getData(
      pagination.cursor,
      pagination.limit
    );
    setPagination({
      ...pagination,
      cursor: pagination.cursor + leaderboardData.length,
    });
    setIsLoading(false);
    return leaderboardData;
  }, []);

  useEffect(() => {
    getLeaderboard().then(data => {
      setLeaderboard(data);
    });
  }, []);

  const renderLeaderboard = useCallback(() => {
    return (
      <div className='leaderboard mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4'>
        <Typography variant='h3' className='mb-8 font-bold'>
          Рейтинг игроков
        </Typography>
        {leaderboard?.map(user => {
          return <UserScore user={user} key={user.userId} />;
        })}
      </div>
    );
  }, [leaderboard]);

  return (
    <PageContainer>
      <Preloader>
        {!isLoading ? (
          leaderboard.length > 0 ? (
            renderLeaderboard()
          ) : (
            <Typography variant='h3'>
              В текущий момент в списке никого нет.{' '}
              <Typography className='underline font-bold mt-4'>
                <Link to={`/${routes.gamePage}`}>Вы можете стать первым!</Link>
              </Typography>
            </Typography>
          )
        ) : undefined}
      </Preloader>
    </PageContainer>
  );
}
