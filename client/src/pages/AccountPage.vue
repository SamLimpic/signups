<template>
  <div class="account flex-grow-1 container-fluid align-items-center text-center mt-3 mx-4 mb-4">
    <div class="row justify-content-around" v-if="state.loading">
      <div class="col-12 p-md-3 px-2 pt-1">
        <h2 class="font-xxl">
          <u>Accessing Account Data</u>
        </h2>
        <i class="fas fa-dice-d20 text-warning fa-spin icon mt-3 mb-auto"></i>
      </div>
    </div>
    <div class="row justify-content-around position-relative" v-else>
      <div class="col-12">
        <h1 class="font-xxl m-0">
          <u>Welcome {{ state.account.name }}</u>
        </h1>
      </div>
      <div class="col-xl-8 col-lg-9 col-md-10 col-11 p-md-3 px-2 pt-1" v-if="!state.characters[0]">
        <h2 class="font-xl">
          <u>You don't have any registered characters!</u>
        </h2>
        <h3 class="font-lg mb-3">
          You'll have to register one before you can sign up for Games
        </h3>
        <CreateCharacter />
      </div>
      <div class="col-12 px-2" v-else>
        <h2 class="font-xl m-0">
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
export default {
  name: 'Account',
  setup() {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account),
      characters: computed(() => AppState.characters),
      graveyard: computed(() => AppState.graveyard),
      profile: computed(() => AppState.profile),
      loading: true
    })
    onMounted(async() => {
      try {
        await charactersService.getCharactersByCreatorId(route.params.id)
        await charactersService.getGraveyardByCreatorId(route.params.id)
        if (state.graveyard[0]) {
          AppState.graveyard.forEach(c => {
            AppState.characters.push(c)
          })
        }
        setTimeout(function() { state.loading = false; AppState.profile = true }, 1000)
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

<style scoped>
.btn-overlay {
  position: absolute;
  right: 10px;
  top: 10px;
  color: var(--light);
}
</style>
