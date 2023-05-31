import { useCallback, useEffect, useState } from 'react';
import { Typography } from '@material-tailwind/react';
import PageContainer from '../../Components/PageContainer';
import UserScore from './components/UserScore';
import Preloader from '../../Components/Preloader';

export type leaderboardUser = {
  userImage: string | undefined;
  userName: string;
  score: number;
};

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<leaderboardUser[]>([]);
    
  const getLeaderboard = useCallback(async () => {

    // return mock data
    let gotData: leaderboardUser[] = [
      {
        userImage:
          'https://centauri-dreams.org/wp-content/uploads/2008/05/omega_centauri_2.jpg',
        userName: 'user1',
        score: 2048,
      },
      {
        userImage:
          'https://centauri-dreams.org/wp-content/uploads/2008/05/omega_centauri_2.jpg',
        userName: 'user2',
        score: 1024,
      },
      { userImage: undefined, userName: 'user3', score: 4096 },
    ];
    gotData = gotData.sort((a, b) => b.score - a.score);

    await new Promise(resolve => setTimeout(resolve, 1000)); // Эмуляция получения данных

    return gotData;
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
          return <UserScore user={user} key={user.userName} />;
        })}
      </div>
    );
  }, [leaderboard]);

  return (
    <PageContainer>
      <Preloader>
        {leaderboard.length > 0 ? renderLeaderboard() : undefined}
      </Preloader>
    </PageContainer>
  );
}
