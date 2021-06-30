import { AppState } from '../AppState'
import { api } from './AxiosService'

class ValuesService {
  async getValues() {
    const res = await api.get('api/values')
    AppState.values = res.data[0]
  }

  async editValue(id, edit) {
    const res = await api.put(`api/values/${id}`, edit)
    AppState.values = res.data[0]
  }
}

export const valuesService = new ValuesService()
