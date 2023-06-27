import { API_URL } from './consts';
import { Comment } from '../pages/Forum/stubs';

const options: OptionsType = {
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  credentials: 'include',
};

export class CommentAPI {
  private endpoint = `${API_URL}/api/forum/topics`;

  async createCommentById(
    id: number,
    data: Comment
  ): Promise<Comment | never> {
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

  async getCommentsById(id: number) : Promise<Comment[]>{
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
}



export default new CommentAPI();
