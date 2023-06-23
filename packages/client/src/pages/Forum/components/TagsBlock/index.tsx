import { FC, useState } from 'react';
import { SideBlock } from '../SideBlock';
import './index.scss';

type TOwnProps = {
  items: string[];
  isLoading: boolean;
};

type TProps = FC<TOwnProps>;

export const TagsBlock: TProps = ({ items, isLoading }: TOwnProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedTag, setSelectedTag] = useState('');

  return (
    <SideBlock title='Тэги'>
      <ul>
        {(!items.length && <p>Тэгов нет</p>)}
        {(isLoading ? [...Array(5)] : items).map(tag => (
          <a
            key={tag}
            style={{ textDecoration: 'none', color: 'black' }}
            onClick={() => setSelectedTag(tag)}>
            <span className='tag tag-lg'>
              {' '}
              {isLoading ? 'Skeleton ...' : '#' + tag}
            </span>
          </a>
        ))}
      </ul>
    </SideBlock>
  );
};
