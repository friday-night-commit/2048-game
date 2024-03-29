import ForumAPI from '../api/ForumAPI';
import { ForumPost, ImgResponse } from '../pages/Forum/forum.interfaces';

class ForumController {

  // public setCSRFToken = (token: string) => ForumAPI.setCSRFToken(token);

  async createPost(post: ForumPost, token: string): Promise<ForumPost | undefined> {
    try {
      return await ForumAPI.createPost(post, token);
    } catch (err) {
      alert(err);
    }
  }

  async loadPostPreview(formData: FormData): Promise<ImgResponse | undefined> {
    try {
      return await ForumAPI.loadPostPreview(formData);
    } catch (err) {
      alert(err);
    }
  }

  async getAllPosts(): Promise<ForumPost[]> {
    try {
      return await ForumAPI.getAllPosts();
    } catch (err) {
      return [];
    }
  }

  async getPostById(id: number): Promise<ForumPost | undefined> {
    try {
      return await ForumAPI.getPostById(id);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(`Error. ${id} not found`);
    }
  }

  async deletePostById(id: number, token: string): Promise<number | undefined> {
    try {
      return await ForumAPI.deletePostById(id, token);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(`Error. ${id} has not been deleted`, err);
    }
  }

  async getAllTags(): Promise<string[]> {
    try {
      return await ForumAPI.getAllTags();
    } catch (err) {
      return [];
    }
  }
}

export default new ForumController();
