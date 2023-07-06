import React, { FC } from 'react';
import './index.scss';

type PostEmptyProps = {
  title: string;
};

const PostEmpty: FC<PostEmptyProps> = ({ title }) => {
  return (
    <div className='empty-block'>
      <span className='empty-icon'></span>
      <div className='wrapper'>
        <div className='typing-demo'>{title}</div>
      </div>
    </div>
  );
};

export default PostEmpty;
