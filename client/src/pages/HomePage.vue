<template>
  <div class="home flex-grow-1 container-fluid align-items-center m-3">
    <div class="row justify-content-around" v-if="state.loading">
      <div class="col-12 text-center p-md-4 p-2">
        <h2 class="font-xxl">
          <u>Sneaking past the Dragon...</u>
        </h2>
        <i class="fas fa-dice-d20 text-warning fa-spin icon mt-3 mb-auto"></i>
      </div>
    </div>
    <div class="row justify-content-around" v-else>
      <div class="col-lg-10 col-12 text-center p-md-4 p-2">
        <h2 class="font-xxl mb-3">
          <u>Welcome to the Dragon's Den!</u>
        </h2>
        <div class="shadow rounded bg-light text-center mx-4 px-lg-4 py-md-4 py-3 px-md-3 px-2">
          <p class="font-xl mx-lg-2 mx-3">
            The Dragon's Den is an interactive site for BattleMage D&D, designed to make signups as simple and easy as possible, both on our Players and Dungeon Masters!
          </p>
          <div v-if="state.user.isAuthenticated">
            <p class="font-lg mx-lg-2 mx-3">
              Check back every Saturday at 10AM to sign up for the week's games.<br>Results will go live every Sunday!
            </p>
            <router-link :to="{name: 'Games'}">
              <button type="button" class="btn btn-primary font-lg">
                View this week's Games
              </button>
            </router-link>
          </div>
          <div v-else>
            <p class="font-lg mx-lg-2 mx-3">
              Simply create your account and register your playable characters to get started!
            </p>
            <button type="button" class="btn btn-primary font-lg" @click="login">
              Get Started!
            </button>
          </div>
        </div>
      </div>
      <!-- <div class="col-12 text-center">
        <h2 class="font-xxl text-center mb-4">
          <u>Welcome to the Dragon's Den!</u>
        </h2>
        <h3><i class="fas fa-dragon text-warning icon"></i></h3>
        <button type="button" class="btn btn-primary font-xl mt-3" @click="confirm">
          Confirm
        </button>
      </div> -->
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
      setTimeout(function() { state.loading = false }, 1000)
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
