import {
  Reaction,
} from '../pages/Forum/forum.interfaces';
import ReactionAPI from '../api/ReactionAPI';

class ReactionController {
  async createReactionByPostId(
    postId: number,
   data: Record<'type', string>,
    token: string
  ): Promise<Reaction | undefined> {
    try {
      return await ReactionAPI.createReactionById(postId, data, token);
    } catch (err) {
      return undefined;
    }
  }

  async getReactionsByPostId(postId: number): Promise<Reaction[] | []> {
    try {
      return await ReactionAPI.getReactionsById(postId);
    } catch (err) {
      return [];
    }
  }
}

export default new ReactionController();
