import { useEffect } from 'react';

import Canvas from './Canvas';
import { Utils } from './Utils';

import './index.scss';

export default function Game() {
  const fullScreenTargetId = 'game-container';

  useEffect(() => {
    Utils.initFullScreen(fullScreenTargetId);
  }, []);

  return (
    <div className='game-container p-4' id={fullScreenTargetId}>
      <Canvas width={500} />
    </div>
  );
}
