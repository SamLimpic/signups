<template>
  <a class="dropdown-item font-md bg-info text-light text-center hoverable py-1 px-lg-4 px-3" :class="{'disabled': charProp.name === state.activeCharacter.name}" @click="change(charProp)" v-if="charProp">{{ charProp.name }}</a>
  <a :class="{'text-center bg-info disabled px-lg-4 px-3': !typeProp, 'text-left bg-secondary px-md-3 px-2': typeProp}" class="dropdown-item font-lg text-light py-1" disabled v-else-if="liveProp">
    <i class="fas fa-skull text-shadow font-xl hoverable mr-md-3 mr-2 mt-md-2 mt-1" v-if="typeProp" @click="remove(dropProp, typeProp)"></i>
    {{ dropProp }}</a>
  <a class="dropdown-item font-sm bg-secondary text-light text-center hoverable py-1 px-lg-4 px-3" @click="select(dropProp, typeProp)" v-else>{{ dropProp }}</a>
  <div class="dropdown-divider p-0 m-0"></div>
</template>

<script>
/* eslint-disable vue/require-default-prop */
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../../AppState'
import Notification from '../../utils/Notification'
import { valuesService } from '../../services/ValuesService'
import { charactersService } from '../../services/CharactersService'
import { gamesService } from '../../services/GamesService'

export default {
  name: 'CharacterDrop',
  props: {
    charProp: {
      type: Object,
      required: false
    },
    dropProp: {
      type: String,
      required: false
    },
    typeProp: {
      type: String,
      required: false
    },
    liveProp: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const state = reactive({
      values: computed(() => AppState.values),
      activeCharacter: computed(() => AppState.activeCharacter)
    })
    onMounted(async() => {

    })
    return {
      state,
      select(choice, type) {
        try {
          AppState.activeCharacter[type.toLowerCase()] = choice
          document.getElementById(type.toLowerCase()).innerText = choice
          document.getElementById(type.toLowerCase()).disabled = true
          Notification.toast(`You've chosen ${choice} as your character's ${type}!`, 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async change(character) {
        try {
          if (await Notification.confirmAction(`Do you want to play with ${character.name} this week instead of ${state.activeCharacter.name}?`, 'You can change this as many times as you want before Game Night!', 'question', 'Confirm')) {
            AppState.load = true
            const game = AppState.activeGame
            AppState.activeCharacter.games = AppState.activeCharacter.games.filter(g => g !== game.id)
            AppState.activeCharacter.live = false
            game.players = game.players.filter(c => c.id !== state.activeCharacter.id)
            character.games.push(game.id)
            character.live = true
            game.players.push(character)
            await gamesService.updateGame(game)
            await charactersService.updateCharacter(state.activeCharacter)
            await charactersService.updateCharacter(character)
            await charactersService.getCharactersByCreatorId(character.creatorId)
            await charactersService.getLive()
            Notification.toast(`${character.name} will participate this week`, 'success')
            AppState.load = false
          } else {
            Notification.toast(`No worries, we'll keep ${state.activeCharacter.name} as your character this week!`, 'info')
          }
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async remove(name, type) {
        try {
          if (await Notification.confirmAction(`Do you want to remove ${name} as an available ${type}`, 'This will make them unavailable to new characters, but existing ones will remain active', 'warning', 'Confirm')) {
            AppState.values[type.toLowerCase()] = AppState.values[type.toLowerCase()].filter(t => t !== name)
            valuesService.editValues(state.values.id, state.values)
            Notification.toast(`${name} is no longer an available ${type}`, 'success')
          } else {
            Notification.toast(`No worries, we'll keep ${name} as an available ${type}`, 'info')
          }
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.fa-skull {
  transition: all .3s ease-in-out;
  color: var(--light)
}
.fa-skull:hover {
  color: var(--danger)
}
.disabled {
  background-color: darken(#5f456c, 10%) !important;
  opacity: .75;
}
</style>
