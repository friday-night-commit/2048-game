import './index.scss';
import Canvas from './Canvas';

export default function Game() {
  return (
    <div className='game-container' id='insert-game'>
      <Canvas width={500} />
    </div>
  );
}
