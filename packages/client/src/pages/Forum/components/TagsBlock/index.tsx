import { FC, useState } from 'react';
import { SideBlock } from '../SideBlock';
import './index.scss';
import { STATE_STATUS } from '../../../../store/slices/Forum';

type TOwnProps = {
  items: string[];
  status: STATE_STATUS;
};

type TProps = FC<TOwnProps>;

export const TagsBlock: TProps = ({ items, status }: TOwnProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedTag, setSelectedTag] = useState('');

  return (
    <SideBlock title='Тэги'>
      <ul>
        {!items.length && <p>Тэгов нет</p>}
        {status === STATE_STATUS.LOADING && <p>Загрузка тегов</p>}
        {status === STATE_STATUS.LOADED &&
          items.map(tag => (
            <a
              key={tag}
              style={{ textDecoration: 'none', color: 'black' }}
              onClick={() => setSelectedTag(tag)}>
              <span className='tag tag-lg'>{'#' + tag}</span>
            </a>
          ))}
      </ul>
    </SideBlock>
  );
};
