<template>
  <div class="dm home flex-grow-1 container-fluid align-items-center m-3">
    <div class="row justify-content-around mt-3 mb-4" v-if="state.account.dm">
      <div class="col-10 text-left">
        <h2 class="font-xl text-center">
          <u>Welcome {{ state.account.name }}!</u>
        </h2>
        <h3 class="font-lg text-center mt-2" v-if="!state.activeGame.live">
          Looks like you haven't added a Game to this week's roster.
        </h3>
        <h3 class="font-lg text-center mt-2" v-else>
          Need to look over this week's Game?
        </h3>
        <CreateGame :game-prop="state.activeGame" />
      </div>
    </div>
    <div class="row justify-content-around my-3" v-else>
      <div class="col-12 text-center">
        <h2 class="font-xl">
          <u>Checking for proper credentials...</u>
        </h2>
        <i class="fas fa-dice-d20 text-warning fa-spin font-xxl mt-3 mb-auto"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'

export default {
  name: 'DM',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      activeGame: computed(() => AppState.activeGame),
      loading: true
    })
    onMounted(async() => {

    })
    return {
      state
    }
  }
}
</script>
<style scoped lang="scss">
.fa-dragon {
  transform: scaleX(-1);
  font-size: 15rem;
}
</style>
