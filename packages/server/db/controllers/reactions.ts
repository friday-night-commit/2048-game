import User from '../models/user.model';
import Topic from '../models/topic.model';
import Reaction from '../models/reaction.model';

async function createReaction(
  userId: number,
  topicId: number
): Promise<Reaction | null> {
  return await Reaction.create({ userId, topicId });
}

async function getReactionsByTopicId(topicId: number): Promise<Reaction[]> {
  return await Reaction.findAll({
    where: { topicId },
    include: [
      { model: User, required: true },
      { model: Topic, required: true },
    ],
  });
}

export default {
  createReaction,
  getReactionsByTopicId,
};
