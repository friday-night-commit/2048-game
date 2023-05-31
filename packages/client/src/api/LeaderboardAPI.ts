import { API_URL } from './consts';

type OptionsType = {
  headers: { 'Content-Type': string };
  credentials: RequestCredentials | undefined;
};

const options: OptionsType = {
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  credentials: 'include',
};

class LeaderboardAPI {
  private endpoint = `${API_URL}/leaderboard`;
	private teamName = 'friday-night-commit';
	private ratingSortField = 'score';

  async addUser(userId: number, score: number) {
		if(!userId || !score) {
      throw new Error('Для добавления в таблицу необходим идентификатор пользователя и счет');
		}

    const data = {
      data: {
				userId: userId,
				score: score
			},
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

	async getLeaderboard() {
    const data = { ratingFieldName: this.ratingSortField, cursor: 0, limit: 10 };
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
