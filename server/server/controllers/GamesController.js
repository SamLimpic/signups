import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { gamesService } from '../services/GamesService'

export class GamesController extends BaseController {
  constructor() {
    super('api/games')
    this.router
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .get('', this.getGames)
      .get('/:id', this.getGameById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createGame)
      .put('/:id', this.editGame)
      .delete('/:id', this.deleteGame)
  }

  async getGames(req, res, next) {
    try {
      const data = await gamesService.getGames(req.query)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getGameById(req, res, next) {
    try {
      const game = await gamesService.getGameById({ _id: req.params.id })
      return res.send(game)
    } catch (error) {
      next(error)
    }
  }

  async createGame(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const data = await gamesService.createGame(req.body, req.userInfo.dm)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async editGame(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const data = await gamesService.editGame(req.body, req.userInfo.dm)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async deleteGame(req, res, next) {
    try {
      const data = await gamesService.delete(req.params.id, req.userInfo.id, req.userInfo.dm)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
