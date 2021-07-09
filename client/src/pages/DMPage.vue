<template>
  <div class="dm flex-grow-1 container-fluid align-items-center m-3">
    <div class="row justify-content-around" v-if="state.account.dm && !state.loading">
      <div class="col-xl-9 col-md-11 col-12 text-left p-md-3 px-4 py-2">
        <h2 class="font-xxl text-center m-0">
          <u>Welcome {{ state.account.name }}!</u>
        </h2>
        <h3 class="font-xl text-center mt-md-1">
          Need to look over this week's Games?
        </h3>
        <CreateGame v-for="(g, index) in state.liveGames" :key="index" :index-prop="index" />
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
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { gamesService } from '../services/GamesService'
import Notification from '../utils/Notification'
import { valuesService } from '../services/ValuesService'

export default {
  name: 'DM',
  setup() {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      liveGames: computed(() => AppState.liveGames),
      loading: true
    })
    onMounted(async() => {
      try {
        await gamesService.getGamesByCreatorId(route.params.id)
        if (AppState.liveGames.length === 1) {
          AppState.liveGames = [...{}]
        } else if (!AppState.liveGames[0]) {
          AppState.liveGames = [{}, {}]
        }
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
