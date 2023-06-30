import {
  Comment,
  LastComment,
  Reaction,
} from '../pages/Forum/forum.interfaces';
import CommentAPI from '../api/ReactionAPI';
import { REACTION_TYPE } from '../Components/ReactionBlock';

class ReactionController {
  async createReactionByPostId(
    postId: number,
    type: REACTION_TYPE
  ): Promise<Reaction | undefined> {
    try {
      return await CommentAPI.createReactionById(postId, type);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('err', err);
      return undefined;
    }
  }

  async getReactionsByPostId(postId: number): Promise<Reaction[] | []> {
    try {
      return await CommentAPI.getReactionsById(postId);
    } catch (err) {
      return [];
    }
  }
}

export default new ReactionController();
