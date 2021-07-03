<template>
  <div class="admin flex-grow-1 container-fluid align-items-center m-3">
    <div class="row justify-content-around" v-if="state.account.admin && !state.loading">
      <div class="col-lg-10 col-sm-11 col-12 text-left p-md-3 px-4 py-2" v-if="state.values">
        <h2 class="font-xxl text-center m-0">
          <u>Welcome {{ state.account.name }}!</u>
        </h2>
        <h3 class="font-xl text-center mt-md-1">
          Here are the current Experience values
        </h3>
        <EditExperience />
      </div>
      <div class="col-12 text-center p-md-3 px-2 pt-4" v-if="state.games[0]">
        <h2 class="font-xl m-0">
          Here are this week's games!
        </h2>
        <div class="row justify-content-around">
          <GameList v-for="(g, index) in state.games" :key="g.id" :game-prop="g" :index-prop="index + 1" :live-prop="!state.loading" />
        </div>
      </div>
    </div>
    <div class="row justify-content-around" v-else>
      <div class="col-12 text-center p-md-3 px-2 pt-2">
        <h2 class="font-xxl">
          <u>Checking for proper credentials...</u>
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
import { valuesService } from '../services/ValuesService'

export default {
  name: 'Admin',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      games: computed(() => AppState.games),
      values: computed(() => AppState.values),
      loading: true,
      experience: false,
      character: false
    })
    onMounted(async() => {
      try {
        await gamesService.getGames()
        await valuesService.getValues()
        state.loading = false
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state
    }
  }
}
</script>
<style scoped lang="scss">
</style>
