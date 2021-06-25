<template>
  <div class="admin home flex-grow-1 d-flex flex-column align-items-center mt-5">
    <div class="row justify-content-around" v-if="state.account.dm">
      <div class="col-12 text-center">
        <h2 class="font-xl">
          <u>Welcome {{ state.account.name }}!</u>
        </h2>
      </div>
    </div>
    <div class="row justify-content-around" v-else>
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
  name: 'Admin',
  setup() {
    const state = reactive({
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
.fa-dragon {
  transform: scaleX(-1);
  font-size: 15rem;
}
</style>
