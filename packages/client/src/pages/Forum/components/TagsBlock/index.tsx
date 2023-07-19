import React, { FC, useCallback, useState } from 'react';
import { SideBlock } from '../SideBlock';
import './index.scss';
import { setTagName, STATE_STATUS } from '../../../../store/slices/Forum';
import { useAppDispatch } from '../../../../hooks/redux';

type TOwnProps = {
  items: string[];
  status: STATE_STATUS;
};

export const ALL_TAG_LABLE = '';

type TProps = FC<TOwnProps>;

export const TagsBlock: TProps = ({ items, status }: TOwnProps) => {

  const dispatch = useAppDispatch();
  const [selectedTag, setTag] = useState(ALL_TAG_LABLE);

  const changeTag = useCallback((tag: string) => {
    dispatch(setTagName(tag));
    setTag(tag);
  }, []);

  return (
    <SideBlock title='Тэги'>
      <ul>
        {!items.length && <p>Тэгов нет</p>}
        {status === STATE_STATUS.LOADING && <p>Загрузка тегов</p>}
        {status === STATE_STATUS.LOADED &&
          items.map(tag => (
            <span
              key={tag}
              style={{ textDecoration: 'none', color: 'black' }}
              onClick={() => changeTag(tag)}>
              <span
                className={`tag-lg ${selectedTag === tag ? 'tag-active' : 'tag'}`}
              >
                {'#' + tag}
              </span>
            </span>
          ))
        }
        {items.length && <span
          key='all'
          onClick={() => changeTag(ALL_TAG_LABLE)}>
          <span className={`tag-lg ${selectedTag === ALL_TAG_LABLE ? 'tag-active' : 'tag'}`}>{'#' + 'Все'}</span>
        </span>}
      </ul>
    </SideBlock>
  );
};
