import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { valuesService } from '../services/ValuesService'

export class ValuesController extends BaseController {
  constructor() {
    super('api/values')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .get('', this.getValues)
      .put('/:id', this.editValue)
  }

  async getValues(req, res, next) {
    try {
      const data = await valuesService.getValues(req.query)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async editValue(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.expMin = req.params.expMin
      req.body.expMax = req.params.expMax
      req.body.expBase = req.params.expBase
      const data = await valuesService.editValue(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
