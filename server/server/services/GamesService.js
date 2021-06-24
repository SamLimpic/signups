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

  async createGame(body, dm) {
    if (dm) {
      return await dbContext.Games.create(body)
    } else {
      throw new BadRequest('Requires DM Permissions')
    }
  }

  async editGame(body, dm) {
    if (dm) {
      const game = await dbContext.Games.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
      if (!game) {
        throw new BadRequest('Invalid request')
      }
      return game
    } else {
      throw new BadRequest('Requires DM Permissions')
    }
  }

  async delete(id, creatorId, dm) {
    if (dm) {
      const data = await dbContext.Games.findOneAndDelete({ _id: id, creatorId })
      if (!data) {
        throw new BadRequest('Invalid Id')
      }
      return 'Successfully Deleted'
    } else {
      throw new BadRequest('Requires DM Permissions')
    }
  }
}

export const gamesService = new GamesService()
