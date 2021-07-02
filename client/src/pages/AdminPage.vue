<template>
  <div class="admin flex-grow-1 container-fluid align-items-center m-3">
    <div class="row justify-content-around" v-if="state.account.admin && !state.loading">
      <div class="col-lg-9 col-md-10 col-sm-11 col-12 text-left p-md-3 px-4 py-2" v-if="state.experience">
        <h2 class="font-xxl text-center m-0">
          <u>Welcome {{ state.account.name }}!</u>
        </h2>
        <h3 class="font-xl text-center mt-md-1">
          Here are the current Experience values
        </h3>
        <EditExperience />
      </div>
      <div class="col-lg-9 col-md-10 col-sm-11 col-12 text-left p-md-3 px-4 py-2">
        <h2 class="font-xxl text-center m-0">
          <u>Welcome {{ state.account.name }}!</u>
        </h2>
        <h3 class="font-xl text-center mt-md-1">
          What games do you want to look over?
        </h3>
        <EditExperience />
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
  name: 'Admin',
  setup() {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      values: computed(() => AppState.values),
      loading: true,
      experience: false,
      games: false,
      character: false
    })
    onMounted(async() => {
      try {
        await gamesService.getGamesByCreatorId(route.params.id)
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
