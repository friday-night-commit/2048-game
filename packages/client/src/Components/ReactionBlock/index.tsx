import React, { useCallback, useState, FC, useEffect } from 'react';
import './index.scss';
import { createReactionByPostId } from '../../store/slices/Reaction';
import {
  clearCommentContent,
  createCommentByPostId,
} from '../../store/slices/Comment';
import { Comment, Reaction } from '../../pages/Forum/forum.interfaces';
import { useAppDispatch } from '../../hooks/redux';

type ReactionBlockProps = {
  topicId: number;
};

export const enum REACTION_TYPE {
  LIKE = 'Like',
  LOVE = 'Love',
  HAHA = 'Haha',
  WOW = 'Wow',
  SAD = 'Sad',
  ANGRY = 'Angry',
}

export const ReactionBlock: FC<ReactionBlockProps> = ({ topicId }) => {
  const dispatch = useAppDispatch();
  const [reactions, setReactions] = useState<Reaction[]>([]);

  const onSendReaction = (reactionType: REACTION_TYPE) => {
    console.log('reactionType', reactionType);
    if (!reactionType) {
      return;
    }

    dispatch(
      createReactionByPostId({ id: Number(topicId), reactionType })
    ).then(data => {
      console.log('data', data);
      const newReaction = data.payload as Reaction;
      if (newReaction) {
        setReactions([...reactions, newReaction]);
      }
    });
  };

  return (
    <div className='box'>
      <input type='checkbox' id='like' className='field-reactions' />
      <h3 className='text-desc'>Press space and after tab key to navigation</h3>
      <label htmlFor='like' className='label-reactions'>
        Like
      </label>
      <div className='toolbox'></div>
      <label className='overlay' htmlFor='like'></label>
      <button
        className='reaction-like'
        onClick={() => onSendReaction(REACTION_TYPE.LIKE)}>
        <span className='legend-reaction'>{REACTION_TYPE.LIKE}</span>
      </button>
      <button
        className='reaction-love'
        onClick={() => onSendReaction(REACTION_TYPE.LOVE)}>
        <span className='legend-reaction'>{REACTION_TYPE.LOVE}</span>
      </button>
      <button
        className='reaction-haha'
        onClick={() => onSendReaction(REACTION_TYPE.HAHA)}>
        <span className='legend-reaction'>{REACTION_TYPE.HAHA}</span>
      </button>
      <button
        className='reaction-wow'
        onClick={() => onSendReaction(REACTION_TYPE.WOW)}>
        <span className='legend-reaction'>{REACTION_TYPE.WOW}</span>
      </button>
      <button
        className='reaction-sad'
        onClick={() => onSendReaction(REACTION_TYPE.SAD)}>
        <span className='legend-reaction'>{REACTION_TYPE.SAD}</span>
      </button>
      <button
        className='reaction-angry'
        onClick={() => onSendReaction(REACTION_TYPE.ANGRY)}>
        <span className='legend-reaction'>{REACTION_TYPE.ANGRY}</span>
      </button>
    </div>
  );
};
