import { FC, useState } from 'react';
import { SideBlock } from '../SideBlock';
import './index.scss';

type TOwnProps = {
  items: string[];
  isLoading: boolean;
};

type TProps = FC<TOwnProps>;

export const TagsBlock: TProps = ({ items, isLoading }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedTag, setSelectedTag] = useState('');

  return (
    <SideBlock title="Тэги">
      <ul>
        {(isLoading ? [...Array(5)] : items).map(tag => (
          <a
            style={{ textDecoration: 'none', color: 'black' }}
            onClick={() =>setSelectedTag(tag)}
          >
            <span className="tag tag-lg">
              {' '}
              {isLoading ? 'Skeleton ...' : '#' + name}
            </span>
          </a>
        ))}
      </ul>
    </SideBlock>
  );
};
