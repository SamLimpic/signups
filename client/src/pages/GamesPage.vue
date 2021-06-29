<template>
  <div class="games flex-grow-1 container-fluid align-items-center m-3">
    <div class="row justify-content-around" v-if="state.loading">
      <div class="col-12 text-center p-md-4 p-2">
        <h2 class="font-xxl">
          <u>Sneaking past the Dragon...</u>
        </h2>
        <i class="fas fa-dice-d20 text-warning fa-spin icon mt-3 mb-auto"></i>
      </div>
    </div>
    <div class="row justify-content-around" v-else-if="!state.account.characters">
      <div class="col-md-10 col-12 p-md-4 p-2">
        <h2 class="font-xxl text-center">
          <u>You don't have any characters to play with!</u>
        </h2>
        <h3 class="font-lg mb-3">
          You'll have to register one before you can sign up...
        </h3>
        <CreateCharacter />
      </div>
    </div>
    <div class="row justify-content-around" v-else>
      <div class="col-12" v-if="!state.activeCharacter">
        <h2 class="font-xxl text-center">
          <u>Which character do you want to play as this week?</u>
        </h2>
        <CharacterList v-for="c in state.account.characters" :key="c.id" :character-prop="c" />
      </div>
      <div class="col-12" v-else-if="state.activeCharacter && state.games[0] && state.choice < state.games.length">
        <h2 class="font-xxl text-center m-0">
          <u>Here is this week's selection!</u>
        </h2>
        <div class="row justify-content-around">
          <GameList v-for="g in state.games" :key="g.id" :game-prop="g" />
        </div>
      </div>
      <div class="col-12" v-else-if="state.choice === state.games.length">
        <h2 class="font-xxl text-center mb-4">
          <u>Confirm your selections to sign up this week!</u>
        </h2>
        <h3><i class="fas fa-dragon text-warning icon"></i></h3>
        <button type="button" class="btn btn-primary font-xl mt-4" @click="confirm">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { gamesService } from '../services/GamesService'
import Notification from '../utils/Notification'

export default {
  name: 'Games',
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      games: computed(() => AppState.games),
      choice: computed(() => AppState.count.choice),
      loading: true
    })
    onMounted(async() => {
      try {
        await gamesService.getGames()
        state.loading = false
      } catch (error) {
        Notification.toast('Error: ', +error, 'error')
      }
    })
    return {
      state,
      confirm() {
        try {
          gamesService.setGames()
          Notification.toast('Your choices have been saved!', 'success')
        } catch (error) {
          Notification.toast('Error: ', +error, 'error')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>