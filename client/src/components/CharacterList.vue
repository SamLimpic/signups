<template>
  <!-- ANCHOR Renders available Characters -->
  <div class="col-md-4 col-6 p-2">
    <div class="bg-light rounded shadow text-left m-2">
      <h3 class="font-xl m-0">
        <u>{{ charProp.title }}</u>
      </h3>
      <h4 class="font-lg">
        <i>The {{ charProp.race }} {{ charProp.class }}</i>
      </h4>
      <h3 class="font-md">
        <i>Level {{ charProp.level }}</i>
      </h3>
      <button type="button" class="btn btn-primary font-xl ml-auto" @click="select(charProp)">
        Select
      </button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'

export default {
  name: 'CharacterList',
  props: {
    charProp: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    onMounted(async() => {

    })
    return {
      state,
      select(character) {
        try {
          AppState.activeCharacter = character
          Notification.toast(`You've selected ${character.name}, the ${character.race} ${character.class}!`, 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

@media (min-width: 0) {

}

@media (min-width: 576px) {

}

@media (min-width: 768px) {

}

@media (min-width: 992px) {

}

@media (min-width: 1200px) {

}

</style>
