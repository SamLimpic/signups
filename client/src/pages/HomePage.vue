<template>
  <div class="home flex-grow-1 container-fluid align-items-center m-3">
    <div class="row justify-content-around" v-if="state.loading">
      <div class="col-12 text-center p-md-3 px-2 pt-2">
        <h2 class="font-xxl">
          <u>Sneaking past the Dragon...</u>
        </h2>
        <i class="fas fa-dice-d20 text-warning fa-spin icon mt-3 mb-auto"></i>
      </div>
    </div>
    <div class="row justify-content-around" v-else>
      <div class="col-12 text-center p-md-3 px-2 pt-2">
        <h2 class="font-xxl mb-3">
          <u>Welcome to the Dragon's Den!</u>
        </h2>
        <div class="shadow rounded bg-light text-center px-4 py-3 my-2">
          <p class="font-xl px-0 mb-2">
            This site was created for all you loyal players, and designed to streamline the signup process for BattleMage D&D
          </p>
          <h3><i class="fas fa-dungeon text-warning icon my-2"></i></h3>
          <p class="font-lg px-1 my-2">
            All players will have 24 hours to select their preferred games, so take your time and sign up whenever it's most convenient for you.
          </p>
          <p class="font-lg px-2 ">
            Games go live every Saturday at 9AM, and Results go live Sunday!
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
import { router } from '../router'

export default {
  name: 'Home',
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      loading: true
    })
    onMounted(async() => {
      AppState.profile = false
      setTimeout(function() { state.loading = false }, 1500)
    })
    return {
      state,
      async login() {
        await AuthService.loginWithPopup()
        router.push('Games')
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
