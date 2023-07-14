import { API_URL, options } from './consts';
import { Reaction } from '../pages/Forum/forum.interfaces';

export class ReactionAPI {
  private endpoint = `${API_URL}/api/forum/reactions`;

  async createReactionById(
    id: number,
    data: Record<'type', string>,
    tokenValue: string
  ): Promise<Reaction | never> {
    options.headers['X-CSRF-Token'] = tokenValue;

    const response = await fetch(`${this.endpoint}/${id}`, {
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

  async getReactionsById(id: number): Promise<Reaction[]> {
    const response = await fetch(`${this.endpoint}/${id}`, {
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

export default new ReactionAPI();
