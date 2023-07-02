import {
  Reaction,
} from '../pages/Forum/forum.interfaces';
import ReactionAPI from '../api/ReactionAPI';

class ReactionController {
  async createReactionByPostId(
    postId: number,
   data: Record<'type', string>
  ): Promise<Reaction | undefined> {
    try {
      return await ReactionAPI.createReactionById(postId, data);
    } catch (err) {
      console.log('err', err);
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
