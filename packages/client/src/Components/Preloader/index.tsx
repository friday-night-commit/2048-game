import { FC } from 'react'

type preloaderProps = {
  renderElement: JSX.Element
  conditionalFunction: () => boolean
}

const Preloader: FC<preloaderProps> = ({renderElement, conditionalFunction}) => {
  return (
    <div className='text-center'>
      {conditionalFunction()
        ? renderElement
        : 'Идёт получение данных...'}
    </div>
  )
}

export default Preloader
