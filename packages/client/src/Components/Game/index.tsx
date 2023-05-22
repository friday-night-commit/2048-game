import './index.scss';
import Canvas from './Canvas';

export default function Game() {
  return (
    <div className='game-container'>
      <Canvas width={500} />
    </div>
  );
}
