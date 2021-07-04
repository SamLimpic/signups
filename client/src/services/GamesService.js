import { AppState } from '../AppState'
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
    this.sortRoster()
  }

  sortRoster() {
    const characters = AppState.characters.filter(c => c.liveGames[0])
    const games = AppState.games
    // const mixed = []
    // const monday = []
    // const tuesday = []
    // characters.forEach(c => {
    //   let mon = false
    //   let tues = false
    //   c.liveGames.forEach(g => {
    //     if (g.day === 'Monday') {
    //       mon = true
    //     } else if (g.day === 'Tuesday') {
    //       tues = true
    //     }
    //   })
    //   if (mon && tues) {
    //     mixed.push(c)
    //   } else if (mon) {
    //     monday.push(c)
    //   } else if (tues) {
    //     tuesday.push(c)
    //   }
    // })
    AppState.sorted = {
      characters: {
        mixed: characters
        // monday: monday,
        // tuesday: tuesday
      },
      games: games,
      full: [],
      roster: []
    }
    for (let i = 0; i < games.length; i++) {
      // this.buildGames('monday', i)
      // this.buildGames('tuesday', i)
      this.buildGames('mixed', i)
    }
    console.log(AppState.sorted)
  }

  buildGames(str, num) {
    const characters = AppState.sorted.characters[str]
    const roster = AppState.sorted.roster
    const full = AppState.sorted.full
    const games = AppState.sorted.games
    games.forEach(g => {
      const holding = []
      characters.forEach(c => {
        if (c.liveGames.length > num) {
          const game = c.liveGames.find(lg => lg.choice === num)
          if (game.id === g.id) {
            holding.push(c)
          }
        }
      })
      let currentIndex = holding.length; let randomIndex
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        [holding[currentIndex], holding[randomIndex]] = [
          holding[randomIndex], holding[currentIndex]]
      }
      holding.forEach(h => {
        if (g.size > g.players.length) {
          g.players.push(h)
          AppState.sorted.characters[str] = AppState.sorted.characters[str].filter(c => c.id !== h.id)
          roster.push(h)
        }
      })
      if (g.size === g.players.length) {
        AppState.sorted.games = AppState.sorted.games.filter(f => f.id !== g.id)
        full.push(g)
      }
    })
  }

  async randomizeGames() {
    await charactersService.getCharacters()
    await this.getGames()
    const characters = AppState.characters
    const games = AppState.games

    for (let i = 0; i < characters.length; i++) {
      characters[i].liveGames = []
      let num = Math.floor(Math.random() * games.length + 3)
      if (num > games.length) {
        num = games.length
      }
      let currentIndex = games.length; let randomIndex
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--;
        [games[currentIndex], games[randomIndex]] = [
          games[randomIndex], games[currentIndex]]
      }
      for (let k = 0; k < num; k++) {
        games[k].choice = k
        characters[i].liveGames.push(games[k])
      }
      AppState.activeCharacter = characters[i]
      await charactersService.editCharacter(characters[i])
    }
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
