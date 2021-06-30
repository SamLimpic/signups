import { AppState } from '../AppState'
import { api } from './AxiosService'
import { valuesService } from './ValuesService'

class CharactersService {
  async getCharacters() {
    const res = await api.get('api/characters')
    AppState.characters = res.data
  }

  async getCharacterById(id) {
    const res = await api.get(`api/characters/${id}`)
    AppState.activeCharacter = res.data
  }

  async getCharactersByCreatorId(id) {
    const res = await api.get(`api/characters?creatorId=${id}`)
    AppState.characters = res.data
    AppState.characters.forEach(c => {
      if (c.liveGames[0]) {
        AppState.activeCharacter = c
      }
    })
  }

  async createCharacter(data) {
    await valuesService.getValues()
    data.experience = AppState.values.expBase
    this.setLevel(data.experience)
    const res = await api.post('api/characters', data)
    AppState.activeCharacter = res.data
  }

  async editCharacter(edit) {
    await valuesService.getValues()
    const char = AppState.activeCharacter
    const exp = AppState.values.expBase
    if (char.experience < exp) {
      char.experience = exp
    }
    this.setLevel(edit.experience)
    const res = await api.put(`api/characters/${edit.id}`, AppState.activeCharacter)
    AppState.activeCharacter = res.data
  }

  async killCharacter(id) {
    await api.delete(`api/characters/${id}`)
    AppState.characters = AppState.characters.filter(g => g.id !== id)
  }

  async setGames(character) {
    character.liveGames = AppState.choices
    this.editCharacter(character)
  }

  setLevel(exp) {
    const char = AppState.activeCharacter
    switch (exp) {
      case exp >= 355000:
        char.level = 20
        break
      case exp >= 305000:
        char.level = 19
        break
      case exp >= 265000:
        char.level = 18
        break
      case exp >= 225000:
        char.level = 17
        break
      case exp >= 195000:
        char.level = 16
        break
      case exp >= 165000:
        char.level = 15
        break
      case exp >= 140000:
        char.level = 14
        break
      case exp >= 120000:
        char.level = 13
        break
      case exp >= 100000:
        char.level = 12
        break
      case exp >= 85000:
        char.level = 11
        break
      case exp >= 64000:
        char.level = 10
        break
      case exp >= 48000:
        char.level = 9
        break
      case exp >= 34000:
        char.level = 8
        break
      case exp >= 23000:
        char.level = 7
        break
      case exp >= 14000:
        char.level = 6
        break
      case exp >= 6500:
        char.level = 5
        break
      case exp >= 2700:
        char.level = 4
        break
      case exp >= 900:
        char.level = 3
        break
      case exp >= 300:
        char.level = 2
        break
      default:
        char.level = 1
        break
    }
  }
}

export const charactersService = new CharactersService()
