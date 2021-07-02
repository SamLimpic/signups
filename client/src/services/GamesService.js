import { AppState } from '../AppState'
import { api } from './AxiosService'

// var cron = require('node-cron');
class GamesService {
  async getPastGames() {
    const res = await api.get('api/games?live=false')
    AppState.games = res.data
  }

  async getGames() {
    const res = await api.get('api/games?live=true')
    AppState.games = res.data
  }

  async getGameById(id) {
    const res = await api.get(`api/games/${id}`)
    AppState.activeGame = res.data
  }

  async getGamesByCreatorId(id) {
    const res = await api.get(`api/games?creatorId=${id}`)
    AppState.games = res.data
    AppState.activeGame = AppState.games.find(g => g.live === true)
    AppState.activeGame.date = AppState.activeGame.date.substring(0, 10)
  }

  async createGame(data) {
    await api.post('api/games', data)
  }

  async editGame(id, edit) {
    const res = await api.put(`api/games/${id}`, edit)
    AppState.activeGame = res.data
    AppState.activeGame.date = AppState.activeGame.date.substring(0, 10)
  }

  async deleteGame(id) {
    await api.delete(`api/games/${id}`)
    AppState.games = AppState.games.filter(g => g.id !== id)
  }
}

// cron.schedule('0 10 * * Sunday', () => {
//   console.log('Running a job on Sundays at 10:00AM at America/Los_Angeles timezone');
// }, {
//   scheduled: true,
//   timezone: "America/Los_Angeles"
// });

// cron.schedule('0 10 * * Saturday', () => {
//   console.log('Running a job on Saturdays at 10:00AM at America/Los_Angeles timezone');
// }, {
//   scheduled: true,
//   timezone: "America/Los_Angeles"
// });

export const gamesService = new GamesService()
