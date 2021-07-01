<template>
  <div class="home flex-grow-1 container-fluid align-items-center mt-3 mx-4 mb-4">
    <div class="row justify-content-around" v-if="state.loading">
      <div class="col-12 text-center p-md-3 py-1">
        <h2 class="font-xxl">
          <u>Sneaking past the Dragon...</u>
        </h2>
        <i class="fas fa-dice-d20 text-warning fa-spin icon mt-3 mb-auto"></i>
      </div>
    </div>
    <div class="row justify-content-around" v-else>
      <div class="col-12 text-center p-md-3 px-2 pt-1">
        <h2 class="font-xxl mb-3">
          <u>Welcome to the Dragon's Den!</u>
        </h2>
        <div class="shadow rounded bg-light text-center py-3 px-4 my-2">
          <p class="font-xl mb-2">
            The Dragon's Den was designed to make signups for BattleMage D&D as simple and easy as possible for everyone!
          </p>
          <h3><i class="fas fa-dungeon text-warning icon my-2"></i></h3>
          <p class="font-lg my-2">
            All players will have 24 hours to select their preferred games, so take your time and sign up whenever it's most convenient for you.
          </p>
          <p class="font-lg">
            Log in every Saturday at 10AM to sign up, and results will go live every Sunday!
          </p>
          <div v-if="state.user.isAuthenticated">
            <router-link :to="{name: 'Games'}">
              <button type="button" class="btn btn-primary font-xl mb-2">
                View this week's Games
              </button>
            </router-link>
          </div>
          <div v-else>
            <button type="button" class="btn btn-primary font-xl mb-2" @click="login">
              Get Started!
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'

export default {
  name: 'Home',
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      loading: true
    })
    onMounted(async() => {
      setTimeout(function() { state.loading = false }, 1500)
    })
    return {
      state,
      async login() {
        AuthService.loginWithPopup()
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
