import { Comment } from '../pages/Forum/stubs';
import CommentAPI from '../api/CommentAPI';

class CommentController {
  async createCommentByPostId(
    postId: number,
    comment: Comment
  ): Promise<Comment | undefined> {
    try {
      const data = await CommentAPI.createCommentById(postId, comment);
      return data;
    } catch (err) {
      return undefined;
    }
  }

  async getCommentsByPostId(postId: number): Promise<Comment[] | []> {
    try {
      return await CommentAPI.getCommentsById(postId);
    } catch (err) {
      return [];
    }
  }
}

export default new CommentController();
