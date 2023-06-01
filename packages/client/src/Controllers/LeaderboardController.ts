import LeaderboardAPI from '../api/LeaderboardAPI';

class LeaderboardController {
	async addRecord(leaderboardUser: leaderboardUser) {
		try {
			await LeaderboardAPI.addUser(leaderboardUser);
		} catch(err) {
			alert(err);
		}
	}

  async getData(cursor: number, limit: number): Promise<leaderboardUser[]> {
    const resultData: leaderboardUser[] = [];
    try {
      const data = await LeaderboardAPI.getLeaderboard(cursor, limit);
      for (const userData of data) {
        const { userId, userName, userImage, score } = userData.data;
        resultData.push({
          score,
          userImage,
          userName,
          userId,
        });
      }
    } catch (err) {
      return [];
    }
    return resultData;
  }
}

export default new LeaderboardController();
