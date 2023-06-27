import {leaderboard} from '../api/LeaderboardAPI';

class LeaderboardController {
  async addRecord(leaderboardUser: leaderboardUser) {
    try {
      await leaderboard.addUser(leaderboardUser);
    } catch (err) {
      alert(err);
    }
  }

  async getData(cursor: number, limit: number): Promise<leaderboardUser[]> {
    const resultData: leaderboardUser[] = [];
    try {
      const data = await leaderboard.getLeaderboard(cursor, limit);
      for (const userData of data) {
        const { userId, userName, userImage, score, timestamp } = userData.data;
        resultData.push({
          score,
          userImage,
          userName,
          userId,
          timestamp,
        });
      }
    } catch (err) {
      return [];
    }
    return resultData;
  }
}

export default new LeaderboardController();
