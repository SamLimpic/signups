import BaseController from '../utils/BaseController'
import { valuesService } from '../services/ValuesService'

export class ValuesController extends BaseController {
  constructor() {
    super('api/values')
    this.router
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
