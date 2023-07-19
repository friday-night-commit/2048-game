import React, { FC, useCallback } from 'react';
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

  const changeTag =useCallback( (tag: string) => {
      dispatch(setTagName(tag));
  }, []);

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
              onClick={() => changeTag(tag)}>
              <span className='tag tag-lg'>{'#' + tag}</span>
            </a>
          ))
        }
        { items.length && <a
          key='all'
          style={{ textDecoration: 'none', color: 'orange' }}
          onClick={() => changeTag(ALL_TAG_LABLE)}>
          <span style={{ background: '#8f7a66' }} className='tag tag-lg'>{'#' + 'Все'}</span>
        </a>}
      </ul>
    </SideBlock>
  );
};
