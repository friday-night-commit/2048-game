import { API_URL } from './consts';
import { ForumPost } from '../pages/Forum/stubs';

const options: OptionsType = {
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  credentials: 'include',
};

export class ForumAPI {
  private endpoint = `${API_URL}/api/forum`;

  async createPost(data: ForumPost) : Promise<ForumPost | never>{
    const response = await fetch(`${this.endpoint}/topics`, {
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

  async getAllPosts() : Promise<ForumPost[] | never>{
    const response = await fetch(`${this.endpoint}/topics`, {
      ...options,
      method: 'GET',
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json?.reason);
    }
    return json;
  }

  async getAllTags() : Promise<string[] | never>{
    const response = await fetch(`${this.endpoint}/topics/tags/all`, {
      ...options,
      method: 'GET',
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json?.reason);
    }
    return json;
  }

  async getPostById(id: number) : Promise<ForumPost>{
    const response = await fetch(`${this.endpoint}/topics/${id}`, {
      ...options,
      method: 'GET',
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json?.reason);
    }
    return json;
  }

  async deletePostById(id: number) : Promise<number | never>{
    const response = await fetch(`${this.endpoint}/topics/${id}`, {
      ...options,
      method: 'DELETE',
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json?.reason);
    }
    return json;
  }
}


export default new ForumAPI();
