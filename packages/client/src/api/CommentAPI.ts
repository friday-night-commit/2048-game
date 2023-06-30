import { API_URL } from './consts';
import { Comment, LastComment } from '../pages/Forum/forum.interfaces';

const options: OptionsType = {
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  credentials: 'include',
};

export class CommentAPI {
  private endpoint = `${API_URL}/api/forum/topics`;
  private lastCommentsEndpoint = `${API_URL}/api/forum/comments`;

  async createCommentById(id: number, data: Comment): Promise<Comment | never> {
    const response = await fetch(`${this.endpoint}/${id}/comments`, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json?.reason);
    }
    return json;
  }

  async getCommentsById(id: number): Promise<Comment[]> {
    const response = await fetch(`${this.endpoint}/${id}/comments`, {
      ...options,
      method: 'GET',
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json?.reason);
    }
    return json;
  }

  async getLastComments(limit = 5): Promise<LastComment[]> {
    const response = await fetch(
      `${this.lastCommentsEndpoint}/lastcomments?limit=${limit}`,
      {
        ...options,
        method: 'GET',
      }
    );
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json?.reason);
    }
    return json;
  }
}

export default new CommentAPI();
