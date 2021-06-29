<template>
  <!-- ANCHOR Renders available Games -->
  <form class="row justify-content-around bg-light rounded shadow m-sm-3 m-md-2 mt-3 py-3 px-md-3 px-2">
    <div class="col-12 p-2 px-4">
      <div class="form-group font-xl">
        <label>Character Name</label>
        <input type="text" class="form-control font-sm" placeholder="" v-model="state.activeCharacter.name">
      </div>
    </div>
    <div class="col-6">
      <div class="form-group font-xl">
        <label>Character Race</label>
        <div class="dropdown dropright">
          <a class="btn btn-secondary dropdown-toggle font-md"
             role="button"
             id="race"
             data-toggle="dropdown"
             aria-haspopup="true"
             aria-expanded="false"
          >
            Choose
          </a>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <div class="dropdown-menu dropdown-menu-right m-0 p-0 mb-1" aria-labelledby="dropdownMenuButton">
              <CharacterDrop v-for="(r, index) in state.races" :key="index" :drop-prop="r" type-prop="Race" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="form-group font-xl">
        <label>Character Class</label>
        <div class="dropdown dropleft">
          <a class="btn btn-secondary dropdown-toggle font-md"
             role="button"
             id="class"
             data-toggle="dropdown"
             aria-haspopup="true"
             aria-expanded="false"
          >
            Choose
          </a>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <div class="dropdown-menu dropdown-menu-right m-0 p-0 mb-1" aria-labelledby="dropdownMenuButton">
              <CharacterDrop v-for="(c, index) in state.classes" :key="index" :drop-prop="c" type-prop="Class" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
// import { charactersService } from '../services/CharactersService'
// import Notification from '../utils/Notification'

export default {
  name: 'CreateCharacter',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      races: computed(() => AppState.races),
      classes: computed(() => AppState.classes),
      activeCharacter: computed(() => AppState.activeCharacter)
    })
    onMounted(async() => {

    })
    return {
      state
      // addCharacter() {
      //   try {

      //   } catch (error) {
      //     Notification.toast('Error: ', +error, 'error')
      //   }
      // }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

@media (min-width: 0) {
  .form-check-input {
    height: 1.25rem;
    width: 1.25rem;
  }
}

@media (min-width: 576px) {
  .form-check-input {
    height: 1rem;
    width: 1rem;
  }
}

@media (min-width: 768px) {
  .form-check-input {
    height: 1.25rem;
    width: 1.25rem;
  }
}

@media (min-width: 992px) {
  .form-check-input {
    height: 1.25rem;
    width: 1.25rem;
  }
}

@media (min-width: 1200px) {
  .form-check-input {
    height: 1.25rem;
    width: 1.25rem;
  }
}

</style>
