import { API_URL } from '../Utils/consts';

type leaderboardAPIData = Promise<Array<Record<'data', leaderboardUser>>>;

const options: OptionsType = {
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  credentials: 'include',
};

class LeaderboardAPI {
  private readonly endpoint = `${API_URL}/api/v2/leaderboard`;
  private readonly teamName = 'fridaynightcommit';
  private readonly ratingSortField = 'score';

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

    // TODO лучше возвращть id нового элемента
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

export const leaderboard = new LeaderboardAPI();