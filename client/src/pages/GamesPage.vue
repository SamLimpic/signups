<template>
  <div class="games flex-grow-1 container-fluid align-items-center text-center m-3">
    <div class="row justify-content-around" v-if="state.loading">
      <div class="col-12 p-md-3 px-2 pt-2">
        <h2 class="font-xxl">
          <u>Accessing Current Game Data</u>
        </h2>
        <i class="fas fa-dice-d20 text-warning fa-spin icon mt-3 mb-auto"></i>
      </div>
    </div>
    <div class="row justify-content-around" v-else-if="state.account.live">
      <div class="col-12 p-md-3 px-2 pt-2">
        <h2 class="font-xxl m-0">
          <u>Here are your final selections!</u>
        </h2>
        <h3 class="font-xl m-0">
          Check back Sunday for the official roster
        </h3>
        <div class="row justify-content-around mt-1">
          <GameSummary v-for="(g, index) in state.activeCharacter.liveGames" :key="g.id" :game-prop="g" :index-prop="index + 1" />
        </div>
      </div>
    </div>
    <div class="row justify-content-around" v-else>
      <div class="col-xl-8 col-lg-9 col-md-10 col-11 p-md-3 px-2 pt-2" v-if="!state.characters[0]">
        <h2 class="font-xxl">
          <u>You don't have any characters to play with!</u>
        </h2>
        <h3 class="font-xl mb-3">
          You'll have to register one before you can sign up...
        </h3>
        <CreateCharacter />
      </div>
      <div class="col-12 p-md-3 px-2 pt-2" v-else-if="!state.activeCharacter.id">
        <h2 class="font-xxl m-0">
          <u>Which character do you want to play this week?</u>
        </h2>
        <h3 class="font-xl m-0">
          You can change this once games are finalized
        </h3>
        <div class="row justify-content-around">
          <CharacterList v-for="c in state.characters" :key="c.id" :char-prop="c" />
        </div>
      </div>
      <div class="col-12 p-md-3 px-2 pt-2" v-else-if="(state.choice + state.removed) <= state.games.length">
        <h2 class="font-xxl m-0">
          <u>Here is this week's selection!</u>
        </h2>
        <h3 class="font-xl m-0">
          Select each game in your preferred order, or remove any you aren't interested in
        </h3>
        <div class="row justify-content-around mt-1">
          <GameList v-for="g in state.games" :key="g.id" :game-prop="g" />
        </div>
      </div>
      <div class="col-12 p-md-3 px-2 pt-2" v-else-if="state.choice === 0">
        <h2 class="font-xxl m-0">
          <u>Think you're funny huh?</u>
        </h2>
        <h3 class="font-xl mb-4">
          I'll be nice and let you try again...
        </h3>
        <h3><i class="fas fa-dragon text-danger icon mb-1"></i></h3>
        <button type="button" class="btn btn-primary font-xl mb-lg-3 mb-2" @click="reload">
          Restart
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
      characters: computed(() => AppState.characters),
      activeCharacter: computed(() => AppState.activeCharacter),
      games: computed(() => AppState.games),
      choices: computed(() => AppState.choices),
      choice: computed(() => AppState.count.choice),
      removed: computed(() => AppState.count.removed),
      loading: true
    })
    onMounted(async() => {
      try {
        await gamesService.getGames()
        setTimeout(function() { state.loading = false }, 1000)
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state,
      reload() {
        try {
          setTimeout(function() { location.reload() }, 1000)
          Notification.toast('Mock the Dragon at your peril', 'warning')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
