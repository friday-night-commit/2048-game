import ProfileAPI from '../api/ProfileAPI';

class ProfileController {
  async changeUser(userData: Partial<User>) {
    try {
      return await ProfileAPI.changeUser(userData);
    } catch (err) {
      alert(err);
    }
  }
  async changeAvatar(data: FormData) {
    try {
      return await ProfileAPI.changeAvatar(data);
    } catch (err) {
      alert(err);
    }
  }
  async changePassword(data: passwordFetchData) {
    try {
      return await ProfileAPI.changePassword(data);
    } catch (err) {
      return `${err}`;
    }
  }
}

export default new ProfileController();
