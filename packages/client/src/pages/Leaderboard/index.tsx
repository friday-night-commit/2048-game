import { useCallback, useEffect, useState } from 'react'
import { Typography } from '@material-tailwind/react'
import PageContainer from '../../Components/PageContainer'
import './style.scss'

type leaderBoardUsers = {
  userName: string
  score: string | number
}

export default function MainPage() {
  const [leaderboard, setLeaderboard] = useState<leaderBoardUsers[]>([])

  const getLeaderboard = useCallback(async () => {
    // return mock data
    let gotData: leaderBoardUsers[] = [
      { userName: 'user1', score: '2048' },
      { userName: 'user2', score: '1024' },
      { userName: 'user3', score: '4096' },
    ]
    gotData = gotData.sort((a, b) => +b.score - +a.score)

    await new Promise(resolve => setTimeout(resolve, 1000)) // Эмуляция получения данных

    return gotData
  }, [])

  useEffect(() => {
    getLeaderboard().then(data => {
      setLeaderboard(data)
    })
  }, [])

  const renderLeaderboard = useCallback(() => {
    return (
      <div className='leaderboard mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4'>
        <Typography variant='h3' className='mb-8 font-bold'>
          Таблица лидеров
        </Typography>
        {leaderboard?.map(user => {
          return (
            <div className='leaderboard__el mb-4'>
              <Typography variant="h5" className='leaderboard__name font-medium'>{user.userName}</Typography>
              <Typography variant="h5" className='leaderboard__score font-bold'>{user.score}</Typography>
            </div>
          )
        })}
      </div>
    )
  }, [leaderboard])

  return (
    <PageContainer>
      <div className='text-center'>
        {leaderboard.length > 0
          ? renderLeaderboard()
          : 'Идёт получение данных...'}
      </div>
    </PageContainer>
  )
}
