import { FC } from 'react'

type preloaderProps = {
  children: JSX.Element
  conditional: boolean
}

const Preloader: FC<preloaderProps> = ({children, conditional}) => {
  return (
    <div className='text-center preloader'>
      {conditional
        ? children
        : 'Идёт получение данных...'}
    </div>
  )
}

export default Preloader
