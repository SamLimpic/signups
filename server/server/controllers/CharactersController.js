import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { charactersService } from '../services/CharactersService'
import { valuesService } from '../services/ValuesService'

export class CharactersController extends BaseController {
  constructor() {
    super('api/characters')
    this.router
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .get('', this.getCharacters)
      .get('/:id', this.getCharacterById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createCharacter)
      .put('/:id', this.editCharacter)
      .delete('/:id', this.killCharacter)
  }

  async getCharacters(req, res, next) {
    try {
      const data = await charactersService.getCharacters(req.query)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getCharacterById(req, res, next) {
    try {
      const character = await charactersService.getCharacterById({ _id: req.params.id })
      return res.send(character)
    } catch (error) {
      next(error)
    }
  }

  async createCharacter(req, res, next) {
    try {
      const expValues = await valuesService.getValues()
      req.body.creatorId = req.userInfo.id
      req.body.experience = expValues.expBase
      this.setLevel(req.body.experience, req.body.level)
      const data = await charactersService.createCharacter(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async editCharacter(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      req.body.experience = req.params.experience
      req.body.level = req.params.level
      this.setLevel(req.body.experience, req.body.level)
      delete req.body.dead
      const data = await charactersService.editCharacter(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async killCharacter(req, res, next) {
    try {
      const data = await charactersService.killCharacter(req.params.id, req.date)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  setLevel(exp, level) {
    switch (exp) {
      case exp >= 355000:
        level = 20
        return level
      case exp >= 305000:
        level = 19
        return level
      case exp >= 265000:
        level = 18
        return level
      case exp >= 225000:
        level = 17
        return level
      case exp >= 195000:
        level = 16
        return level
      case exp >= 165000:
        level = 15
        return level
      case exp >= 140000:
        level = 14
        return level
      case exp >= 120000:
        level = 13
        return level
      case exp >= 100000:
        level = 12
        return level
      case exp >= 85000:
        level = 11
        return level
      case exp >= 64000:
        level = 10
        return level
      case exp >= 48000:
        level = 9
        return level
      case exp >= 34000:
        level = 8
        return level
      case exp >= 23000:
        level = 7
        return level
      case exp >= 14000:
        level = 6
        return level
      case exp >= 6500:
        level = 5
        return level
      case exp >= 2700:
        level = 4
        return level
      case exp >= 900:
        level = 3
        return level
      case exp >= 300:
        level = 2
        return level
      default:
        level = 1
        return level
    }
  }
}
