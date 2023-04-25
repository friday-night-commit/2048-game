import { FC } from 'react'

import Navbar from '../../Components/Navbar'

type TOwnProps = {
  children: JSX.Element | JSX.Element[]
}

const PageContainer: FC<TOwnProps> = ({children}) => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div style={{padding: '2em'}}>
        {children}
      </div>
    </div>
  )
}

export default PageContainer
