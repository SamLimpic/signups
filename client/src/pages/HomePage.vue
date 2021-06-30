<template>
  <div class="home flex-grow-1 container-fluid align-items-center m-md-3 my-4 m-2">
    <div class="row justify-content-around" v-if="state.loading">
      <div class="col-12 text-center p-md-3 py-1">
        <h2 class="font-xxl">
          <u>Sneaking past the Dragon...</u>
        </h2>
        <i class="fas fa-dice-d20 text-warning fa-spin icon mt-3 mb-auto"></i>
      </div>
    </div>
    <div class="row justify-content-around" v-else>
      <div class="col-lg-9 col-md-10 col-sm-11 col-12 text-center p-md-3 py-1">
        <h2 class="font-xxl mb-3">
          <u>Welcome to the Dragon's Den!</u>
        </h2>
        <div class="shadow rounded bg-light text-center py-3 px-4 my-2 mx-3">
          <p class="font-xl mb-2">
            The Dragon's Den was made for all of you loyal players, designed to make signups for BattleMage D&D as simple and easy as possible!
          </p>
          <h3><i class="fas fa-dragon text-warning icon my-2"></i></h3>
          <p class="font-lg my-2">
            Everyone will have 24 hours to select their preferred games before the week's roster is decided, so you can sign up whenever is most convenient for you!
          </p>
          <p class="font-lg">
            Log in every Saturday at 10AM to sign up! Results will go live every Sunday at 10AM!
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
