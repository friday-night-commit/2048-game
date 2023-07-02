import Comment from '../models/comment.model';
import User from '../models/user.model';
import Topic from '../models/topic.model';

async function createComment(
  text: string,
  userId: number,
  topicId: number,
  parentId?: number
): Promise<Comment | null> {
  return await Comment.create(
    { text, userId, topicId, parentId },
  );
}

async function deleteCommentById(id: number): Promise<number> {
  return await Comment.destroy({ where: { id } });
}

async function getCommentById(id: number): Promise<Comment | null> {
  return await Comment.findOne({
    where: { id },
    include: [
      { model: User, required: true },
      { model: Topic, required: true },
    ],
  });
}

async function getCommentsByTopicId(topicId: number): Promise<Comment[]> {
  return await Comment.findAll({
    where: { topicId },
    include: [
      { model: User, required: true },
      { model: Topic, required: true },
    ],
  });
}

async function getLastComments(limit: number): Promise<Comment[]> {
  return await Comment.findAll({
    order: [['updatedAt', 'DESC']],
    limit: limit,
    include: [
      { model: User, required: true },
      { model: Topic, required: true },
    ],
  });
}

export default {
  createComment,
  deleteCommentById,
  getCommentById,
  getCommentsByTopicId,
  getLastComments,
};
