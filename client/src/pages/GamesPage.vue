<template>
  <div class="games flex-grow-1 container-fluid align-items-center text-center m-3">
    <div class="row justify-content-around" v-if="state.loading">
      <div class="col-12 p-md-3 py-1">
        <h2 class="font-xxl">
          <u>Accessing Current Game Data</u>
        </h2>
        <i class="fas fa-dice-d20 text-warning fa-spin icon mt-3 mb-auto"></i>
      </div>
    </div>
    <div class="row justify-content-around" v-else-if="state.account.live">
      <div class="col-12 p-md-3 py-1">
        <h2 class="font-xxl  m-0">
          <u>Here's your final selections!</u>
        </h2>
        <h3 class="font-xl  m-0">
          Check back Sunday for the official roster
        </h3>
        <div class="row justify-content-around">
          <GameList v-for="(g, index) in state.activeCharacter.liveGames" :key="g.id" :game-prop="g" :index-prop="index + 1" :live-prop="state.account.live" />
        </div>
      </div>
    </div>
    <div class="row justify-content-around" v-else>
      <div class="col-xl-8 col-lg-9 col-md-10 col-11 p-md-3 py-1" v-if="!state.characters[0]">
        <h2 class="font-xxl">
          <u>You don't have any characters to play with!</u>
        </h2>
        <h3 class="font-xl mb-3">
          You'll have to register one before you can sign up...
        </h3>
        <CreateCharacter />
      </div>
      <div class="col-12 p-md-3 py-1" v-else-if="!state.activeCharacter.id">
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
      <div class="col-12 p-md-3 py-1" v-else-if="state.choice < state.games.length">
        <h2 class="font-xxl  m-0">
          <u>Here is this week's selection!</u>
        </h2>
        <h3 class="font-xl  m-0">
          Select each game in your preferred order.
        </h3>
        <div class="row justify-content-around">
          <GameList v-for="g in state.games" :key="g.id" :game-prop="g" />
        </div>
      </div>
      <div class="col-12 p-md-3 py-1" v-else>
        <h2 class="font-xxl mb-4">
          <u>Confirm your selections to sign up this week!</u>
        </h2>
        <h3><i class="fas fa-dragon text-warning icon mb-1"></i></h3>
        <button type="button" class="btn btn-primary font-xl mb-lg-3 mb-2" @click="confirm">
          Confirm
        </button>
        <div class="row justify-content-around">
          <GameSummary v-for="(g, index) in state.choices" :key="g.id" :game-prop="g" :index-prop="index + 1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { gamesService } from '../services/GamesService'
import { charactersService } from '../services/CharactersService'
import Notification from '../utils/Notification'
import { accountService } from '../services/AccountService'

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
      confirm() {
        try {
          charactersService.setGames(state.activeCharacter)
          accountService.signup(true)
          Notification.toast('Your choices have been saved!', 'success')
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
