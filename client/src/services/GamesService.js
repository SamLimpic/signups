import { AppState } from '../AppState'
import { api } from './AxiosService'

class GamesService {
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

export const gamesService = new GamesService()
