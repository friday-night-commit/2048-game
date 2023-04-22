import { FC } from 'react'

import Navbar from '../../Components/Navbar'

type TOwnProps = {
  children: JSX.Element | JSX.Element[]
}

const PageContainer: FC<TOwnProps> = ({children}) => {
  return (
    <div className='grid grid-cols-1 grid-rows-2 gap-4'>
      <div>
        <Navbar />
      </div>
      <div className='text-center' style={{paddingBottom: '2em'}}>
        {children}
      </div>
    </div>
  )
}

export default PageContainer
