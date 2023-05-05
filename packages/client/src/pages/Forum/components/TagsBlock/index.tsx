import { FC } from 'react';
import { SideBlock } from '../SideBlock';
import './index.scss';

type TOwnProps = {
  items: string[];
  isLoading: boolean;
};

type TProps = FC<TOwnProps>;

export const TagsBlock: TProps = ({ items, isLoading }) => {
  return (
    <SideBlock title="Тэги">
      <ul>
        {(isLoading ? [...Array(5)] : items).map((name) => (
          <a
            style={{ textDecoration: 'none', color: 'black' }}
            href={`/tags/${name}`}>
            <span className='tag tag-lg'> {isLoading ? 'Skeleton ...' : '#' + name}</span>
          </a>
        ))}
      </ul>
    </SideBlock>
  );
};
