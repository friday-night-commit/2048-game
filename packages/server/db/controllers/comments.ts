import Comment from '../models/comment.model';

async function createComment(
  text: string,
  userId: number,
  topicId: number | null,
  commentId?: number
): Promise<Comment | null> {
  return await Comment.create({ text, userId, topicId, commentId });
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

export default {
  createComment,
  deleteCommentById,
  getCommentById,
  getCommentsByTopicId,
};
