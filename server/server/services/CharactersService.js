import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CharactersService {
  async getCharacters(query) {
    const characters = await dbContext.Characters.find(query)
    return characters
  }

  async getCharacterById(id) {
    const character = await dbContext.Characters.findOne({ _id: id })
      .populate('player', 'name picture')
    if (!character) {
      throw new BadRequest('Invalid Id')
    }
    return character
  }

  async createCharacter(body) {
    return await dbContext.Characters.create(body)
  }

  async editCharacter(body) {
    const character = await dbContext.Characters.findOneAndUpdate({ _id: body.id, dead: false }, body, { new: true })
    if (!character) {
      throw new BadRequest('Invalid request')
    }
    return character
  }

  async killCharacter(id, date) {
    const body = { dead: true, killDate: date }
    const data = await dbContext.Characters.findOneAndUpdate({ _id: id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }
}

export const charactersService = new CharactersService()
