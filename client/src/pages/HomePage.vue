<template>
  <div class="home flex-grow-1 container-fluid align-items-center m-3">
    <div class="row justify-content-around mt-3 mb-4" v-if="!state.loading">
      <div class="col-12" v-if="state.games[0] && state.choice < state.games.length">
        <h2 class="font-xxl text-center">
          <u>Here is this week's selection!</u>
        </h2>
        <div class="row justify-content-around mt-3">
          <GameList v-for="g in state.games" :key="g.id" :game-prop="g" />
        </div>
      </div>
      <div class="col-12" v-else>
        <h2 class="font-xxl text-center mb-4">
          <u>Confirm your selections to sign up this week!</u>
        </h2>
        <h3><i class="fas fa-dragon text-warning icon"></i></h3>
        <button type="button" class="btn btn-primary font-xl mt-4" @click="confirm">
          Confirm
        </button>
      </div>
    </div>
    <div class="row justify-content-around my-3" v-else>
      <div class="col-12 text-center">
        <h2 class="font-xxl">
          <u>Sneaking past the Dragon...</u>
        </h2>
        <i class="fas fa-dice-d20 text-warning fa-spin icon mt-3 mb-auto"></i>
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
  name: 'Home',
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
.home{
  text-align: center;
  user-select: none;

}
</style>
