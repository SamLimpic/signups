import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async editAccount(edit) {
    const res = await api.put('/account', edit)
    AppState.account = res.data
  }

  async signup(bool) {
    AppState.account.live = bool
    const res = await api.put('/account', AppState.account)
    AppState.account = res.data
  }

  // #region TIMESTAMP
  // async updateTimeStamp(edit) {
  //   const now = new Date()
  //   let day = now.getDate()
  //   let hour = now.getHours()
  //   let minute = now.getMinutes()
  //   let second = now.getSeconds()
  //   const millisecond = now.getMilliseconds()
  //   if (day.toString().length === 1) {
  //     day = '0' + day
  //   }
  //   if (hour.toString().length === 1) {
  //     hour = '0' + hour
  //   }
  //   if (minute.toString().length === 1) {
  //     minute = '0' + minute
  //   }
  //   if (second.toString().length === 1) {
  //     second = '0' + second
  //   }
  //   const dateTime = day + '/' + hour + ':' + minute + ':' + second + ':' + millisecond
  //   edit.timeStamp = dateTime
  //   const res = await api.put('/account', edit)
  //   AppState.account = res.data
  // }
  // #endregion
}

export const accountService = new AccountService()
