import {user} from '../api/ProfileAPI';

class ProfileController {
  async changeUser(userData: Partial<User>) {
    try {
      return await user.changeUser(userData);
    } catch (err) {
      alert(err);
    }
  }
  async changeAvatar(data: FormData) {
    try {
      return await user.changeAvatar(data);
    } catch (err) {
      alert(err);
    }
  }
  async changePassword(data: passwordFetchData) {
    try {
      return await user.changePassword(data);
    } catch (err) {
      return `${err}`;
    }
  }
}

export default new ProfileController();
