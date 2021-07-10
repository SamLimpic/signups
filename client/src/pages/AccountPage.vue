<template>
  <div class="account flex-grow-1 container-fluid align-items-center text-center m-3">
    <div class="row justify-content-around" v-if="state.loading || state.load">
      <div class="col-12 p-md-3 px-2 pt-2">
        <h2 class="font-xxl">
          <u>Accessing Account Data</u>
        </h2>
        <i class="fas fa-dice-d20 text-warning fa-spin icon mt-3 mb-auto"></i>
      </div>
    </div>
    <div class="row justify-content-around" v-else-if="state.create">
      <div class="col-12 p-md-3 px-2 pt-2">
        <h2 class="font-xxl">
          <u>Register your new Character</u>
        </h2>
        <button type="button" class="btn btn-info font-lg mb-3" @click="create">
          Back to Profile
        </button>
        <CreateCharacter />
      </div>
    </div>
    <div class="row justify-content-around position-relative" v-else>
      <div class="col-xl-8 col-lg-9 col-md-10 col-sm-11 col-12 p-md-3 px-4 py-2" v-if="!state.characters[0]">
        <h1 class="font-xxl m-0">
          <u>Welcome {{ state.account.name }}!</u>
        </h1>
        <h2 class="font-xl">
          You don't have any registered characters!
        </h2>
        <CreateCharacter />
      </div>
      <div class="col-12 pt-md-3 px-3 pt-2 pb-0" v-else>
        <h1 class="font-xxl m-0">
          <u>Welcome {{ state.account.name }}</u>
        </h1>
        <button type="button" class="btn btn-info font-lg mt-2" @click="create">
          Register New Character
        </button>
        <div class="row justify-content-around" v-if="state.account.live && state.activeCharacter.liveGames[0]">
          <div class="col-12">
            <h2 class="font-xl pt-2">
              Here are your selections for this week!
            </h2>
          </div>
          <GameList v-for="(g, index) in state.activeCharacter.liveGames" :key="g.id" :game-prop="g" :index-prop="index + 1" :live-prop="!state.loading" />
        </div>
        <div class="row justify-content-around" v-else-if="state.account.live">
          <GameList v-for="(g, index) in state.activeCharacter.liveGames" :key="g.id" :game-prop="g" :index-prop="index + 1" :live-prop="!state.loading" />
          <div class="col-12">
            <h3 class="font-xl m-0 pt-2">
              You've been selected for a game this {{ state.activeGame.day }}!
            </h3>
          </div>
          <GameList :game-prop="state.activeGame" :live-prop="!state.loading" />
        </div>
        <h2 class="font-xl pt-2">
          Here are your registered characters!
        </h2>
        <div class="row justify-content-around">
          <CharacterList v-for="c in state.characters" :key="c.id" :char-prop="c" :live-prop="state.profile" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { charactersService } from '../services/CharactersService'
import { useRoute } from 'vue-router'
import { valuesService } from '../services/ValuesService'
export default {
  name: 'Account',
  setup() {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      characters: computed(() => AppState.characters),
      activeCharacter: computed(() => AppState.activeCharacter),
      activeGame: computed(() => AppState.activeGame),
      graveyard: computed(() => AppState.graveyard),
      profile: computed(() => AppState.profile),
      load: computed(() => AppState.load),
      loading: true,
      create: false
    })
    onMounted(async() => {
      try {
        setTimeout(function() { state.loading = false; AppState.profile = true }, AppState.timer)
        await charactersService.getCharactersByCreatorId(route.params.id)
        await charactersService.getGraveyardByCreatorId(route.params.id)
        await charactersService.getLive()
        await valuesService.getValues()
        if (state.graveyard[0]) {
          AppState.graveyard.forEach(c => {
            AppState.characters.push(c)
          })
        }
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state,
      create() {
        try {
          if (state.create) {
            location.reload()
          } else {
            AppState.activeCharacter = {}
            state.create = true
          }
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  }
}
</script>

<style scoped>
.btn-overlay {
  position: absolute;
  right: 10px;
  top: 10px;
  color: var(--light);
}
</style>
