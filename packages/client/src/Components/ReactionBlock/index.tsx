import React, {  useState, FC, useEffect } from 'react';
import './index.scss';
import { createReactionByPostId, getReactionsByPostId } from '../../store/slices/Reaction';
import { Reaction } from '../../pages/Forum/forum.interfaces';
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
  let groupedReactions: Record<REACTION_TYPE, Reaction[]> = groupByType(reactions);

  function groupByType(items: Reaction[]): Record<REACTION_TYPE, Reaction[]> {
    return items.reduce((grouped: Record<string, Reaction[]>, item: Reaction) => {
      const { type } = item;
      if (grouped[type]) {
        grouped[type].push(item);
      } else {
        grouped[type] = [item];
      }
      return grouped;
    }, {});
  }

  useEffect(() => {
    dispatch(getReactionsByPostId(Number(topicId))).then(data => {
      const reactions = data.payload as Reaction[];
      if (reactions.length) {
        setReactions(reactions);
      }
    });
  }, [topicId]);

  const onSendReaction = (type: REACTION_TYPE) => {
    if (!type) {
      return;
    }
    const data = { type };
    dispatch(
      createReactionByPostId({ id: Number(topicId), data })).then(data => {
      const newReaction = data.payload as Reaction;
      if (newReaction) {
        const updatedReactions = [...reactions, newReaction];
        groupedReactions = groupByType(updatedReactions);
        setReactions(updatedReactions);
      }
    });
  };

  return (
    <div className='box'>
      <input type='checkbox' id='like' className='field-reactions' />
      <label htmlFor='like' className='label-reactions'>
        {REACTION_TYPE.LIKE}
      </label>

      <div className='toolbox'></div>
      <label className='overlay' htmlFor='like'></label>
      <button
        className='reaction-like'
        onClick={() => onSendReaction(REACTION_TYPE.LIKE)}>
        <span className='legend-reaction'>
          {groupedReactions[REACTION_TYPE.LIKE]?.length}
        </span>
      </button>
      <button
        className='reaction-love'
        onClick={() => onSendReaction(REACTION_TYPE.LOVE)}>
        <span className='legend-reaction'>
       {groupedReactions[REACTION_TYPE.LOVE]?.length}
        </span>
      </button>
      <button
        className='reaction-haha'
        onClick={() => onSendReaction(REACTION_TYPE.HAHA)}>
        <span className='legend-reaction'>
     {groupedReactions[REACTION_TYPE.HAHA]?.length}
        </span>
      </button>
      <button
        className='reaction-wow'
        onClick={() => onSendReaction(REACTION_TYPE.WOW)}>
        <span className='legend-reaction'>
     {groupedReactions[REACTION_TYPE.WOW]?.length}
        </span>
      </button>
      <button
        className='reaction-sad'
        onClick={() => onSendReaction(REACTION_TYPE.SAD)}>
        <span className='legend-reaction'>
         {groupedReactions[REACTION_TYPE.SAD]?.length}
        </span>
      </button>
      <button
        className='reaction-angry'
        onClick={() => onSendReaction(REACTION_TYPE.ANGRY)}>
        <span className='legend-reaction'>
            {groupedReactions[REACTION_TYPE.ANGRY]?.length}
        </span>
      </button>
      {reactions?.length}
    </div>
  );
};
