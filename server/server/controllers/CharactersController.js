import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { charactersService } from '../services/CharactersService'

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
      req.body.creatorId = req.userInfo.id
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
}
