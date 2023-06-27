import Comment from '../models/comment.model';

async function createComment(
  text: string,
  userId: number,
  topicId: number,
  parentId?: number
): Promise<Comment | null> {
  return await Comment.create({ text, userId, topicId, parentId });
}

async function deleteCommentById(id: number): Promise<number> {
  return await Comment.destroy({ where: { id } });
}

async function getCommentById(id: number): Promise<Comment | null> {
  return await Comment.findOne({ where: { id } });
}

async function getCommentsByTopicId(topicId: number): Promise<Comment[]> {
  return await Comment.findAll({ where: { topicId } });
}

async function getLastComments(
  yandexId: number,
  limit: number
): Promise<Comment[]> {
  // eslint-disable-next-line no-console
  console.log('yandexId', yandexId);
  return await Comment.findAll({
     order: [['updatedAt', 'DESC']],
     limit: limit,
      // include: { model: User, where: { yandexId }, as: 'user' },
  });
}

export default {
  createComment,
  deleteCommentById,
  getCommentById,
  getCommentsByTopicId,
  getLastComments,
};
