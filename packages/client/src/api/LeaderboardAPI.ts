import { API_URL, options } from './consts';

type leaderboardAPIData = Promise<Array<Record<'data', leaderboardUser>>>;

class LeaderboardAPI {
  private endpoint = `${API_URL}/api/v2/leaderboard`;
  private teamName = 'fridaynightcommit';
  private ratingSortField = 'score';

  async addUser(leaderboardUserData: leaderboardUser) {
    const data = {
      data: leaderboardUserData,
      ratingFieldName: this.ratingSortField,
      teamName: this.teamName,
    };
    const endpoint = this.endpoint;
    const response = await fetch(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.reason);
    }

    return true;
  }

  async getLeaderboard(cursor = 0, limit = 10): leaderboardAPIData {
    const data = { ratingFieldName: this.ratingSortField, cursor, limit };
    const endpoint = `${this.endpoint}/${this.teamName}`;
    const response = await fetch(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.reason);
    }

    return responseData;
  }
}

export default new LeaderboardAPI();
