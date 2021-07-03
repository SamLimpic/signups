import { AppState } from '../AppState'
import { accountService } from './AccountService'
import { api } from './AxiosService'
import { charactersService } from './CharactersService'

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
    AppState.activeGames = AppState.games.filter(g => g.live === true)
    AppState.activeGames.forEach(g => {
      g.date = g.date.substring(0, 10)
    })
  }

  async createGame(data) {
    await api.post('api/games', data)
  }

  async editGame(id, edit) {
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const date = new Date(edit.date.substring(0, 10).replace('-', ', '))
    const day = date.getDay()
    edit.day = week[day]
    const res = await api.put(`api/games/${id}`, edit)
    let game = AppState.activeGames.find(g => g.id === id)
    game = res.data
    game.date = game.date.substring(0, 10)
  }

  async deleteGame(id) {
    await api.delete(`api/games/${id}`)
    AppState.games = AppState.games.filter(g => g.id !== id)
  }

  async buildRoster() {
    await charactersService.getCharacters()
    await this.getGames()
    const characters = AppState.characters.filter(c => c.liveGames[0])
    const games = AppState.games
    characters.forEach(c => {
      let monday = false
      let tuesday = false
      let mixed = false
      c.liveGames.forEach(g => {
        if (g.day === 'Monday') {
          monday = true
        } else if (g.day === 'Tuesday') {
          tuesday = true
        }
        if (monday && tuesday) {
          mixed = true
        }
      })
    })
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
