import { AppState } from '../AppState'
import { api } from './AxiosService'

class GamesService {
  async getGameById(id) {
    const res = await api.get(`api/games/${id}`)
    AppState.game = res.data
  }

  async createGame(data) {
    await api.post('api/games', data)
  }

  async editGame(id, edit) {
    const res = await api.put(`api/games/${id}`, edit)
    AppState.activeGame = res.data
  }

  async deleteGame(id) {
    await api.delete(`api/games/${id}`)
    AppState.games = AppState.games.filter(g => g.id !== id)
  }
}

export const gamesService = new GamesService()
