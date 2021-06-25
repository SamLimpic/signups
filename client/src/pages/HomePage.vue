<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <i class="fas fa-dice-d20 text-warning fa-spin font-xxl mt-5 mb-auto" v-if="!state.user.isAuthenticated"></i>
    <h1 class="bg-dark text-light py-3 px-4 rounded d-flex align-items-center mb-auto mt-5" v-else>
      <i class="fas fa-dragon text-warning mr-3"></i> Welcome to The Dragon's Den
    </h1>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
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
.home{
  text-align: center;
  user-select: none;

}
</style>
