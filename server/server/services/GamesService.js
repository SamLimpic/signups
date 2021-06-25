import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class GamesService {
  async getGames(query) {
    const games = await dbContext.Games.find(query)
    return games
  }

  async getGameById(id) {
    const game = await dbContext.Games.findOne({ _id: id })
      .populate('player', 'name picture')
    if (!game) {
      throw new BadRequest('Invalid Id')
    }
    return game
  }

  async createGame(body) {
    return await dbContext.Games.create(body)
  }

  async editGame(body) {
    const game = await dbContext.Games.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    if (!game) {
      throw new BadRequest('Invalid request')
    }
    return game
  }

  async closeGame(id) {
    const body = { live: false }
    const data = await dbContext.Characters.findOneAndUpdate({ _id: id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }
}

export const gamesService = new GamesService()
