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
      .delete('/:id', this.closeGame)
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
      req.body.live = true
      const data = await gamesService.createGame(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async editGame(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const data = await gamesService.editGame(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async closeGame(req, res, next) {
    try {
      const data = await gamesService.closeGame(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
