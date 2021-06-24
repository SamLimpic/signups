import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .put('', this.editAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async editAccount(req, res, next) {
    try {
      req.body.id = req.userInfo.id
      req.body.email = req.userInfo.email
      req.body.admin = req.userInfo.admin
      req.body.dm = req.userInfo.dm
      const data = await accountService.updateAccount(req.userInfo, req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
