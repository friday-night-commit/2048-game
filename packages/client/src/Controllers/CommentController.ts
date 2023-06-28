import { Comment, LastComment } from '../pages/Forum/forum.interfaces';
import CommentAPI from '../api/CommentAPI';

class CommentController {
  async createCommentByPostId(
    postId: number,
    comment: Comment
  ): Promise<Comment | undefined> {
    try {
      return await CommentAPI.createCommentById(postId, comment);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('err', err);
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

  async getLastComments(limit: number): Promise<LastComment[] | []> {
    try {
      return await CommentAPI.getLastComments(limit);
    } catch (err) {
      return [];
    }
  }
}

export default new CommentController();
