import { API_URL, options } from './consts';
import { ForumPost, ImgResponse } from '../pages/Forum/forum.interfaces';

export class ForumAPI {
  private endpoint = `${API_URL}/api/forum/topics`;

  async createPost(data: ForumPost, tokenValue: string): Promise<ForumPost | never> {

    options.headers['X-CSRF-Token'] = tokenValue;
    const response = await fetch(`${this.endpoint}`, {
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

  async loadPostPreview(formData: FormData): Promise<ImgResponse | never> {
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json?.reason);
    }
    return json;
  }

  async getAllPosts(): Promise<ForumPost[] | never> {
    const response = await fetch(`${this.endpoint}`, {
      ...options,
      method: 'GET',
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json?.reason);
    }
    return json;
  }

  async getAllTags(): Promise<string[] | never> {
    const response = await fetch(`${this.endpoint}/tags/all`, {
      ...options,
      method: 'GET',
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json?.reason);
    }
    return json;
  }

  async getPostById(id: number): Promise<ForumPost> {
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

  async deletePostById(id: number, tokenValue: string): Promise<number | never> {
    options.headers['X-CSRF-Token']=tokenValue;
    const response = await fetch(`${this.endpoint}/${id}`, {
      ...options,
      method: 'DELETE',
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json?.reason);
    }
    return id;
  }
}

export default new ForumAPI();
