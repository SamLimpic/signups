import { AppState } from '../AppState'
import { accountService } from './AccountService'
import { api } from './AxiosService'

class CharactersService {
  async getCharacters() {
    const res = await api.get('api/characters')
    AppState.characters = res.data
    for (let i = 0; i < AppState.characters.length; i++) {
      AppState.options.push(i)
    }
  }

  async getCharacterById(id) {
    const res = await api.get(`api/characters/${id}`)
    AppState.activeCharacter = res.data
  }

  async getCharactersByCreatorId(id) {
    const res = await api.get(`account/characters?creatorId=${id}`)
    AppState.characters = res.data
  }

  async createCharacter(data) {
    const res = await api.post('api/characters', data)
    await accountService.addCharacter(res.data)
  }

  async editCharacter(id, edit) {
    const res = await api.put(`api/characters/${id}`, edit)
    AppState.activeCharacter = res.data
    AppState.activeCharacter.date = AppState.activeCharacter.date.substring(0, 10)
  }

  async deleteCharacter(id) {
    await api.delete(`api/characters/${id}`)
    AppState.characters = AppState.characters.filter(g => g.id !== id)
  }
}

export const charactersService = new CharactersService()
