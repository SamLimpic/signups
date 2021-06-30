<template>
  <!-- ANCHOR Renders available Characters -->
  <div class="col-lg-3 col-sm-4 col-6 p-3">
    <div class="row justify-content-between bg-light rounded shadow text-left hoverable p-md-2 p-1 pt-2" @click="select(charProp)">
      <div class="col-12 text-center mb-2">
        <h3 class="font-xxl m-0">
          <u>{{ charProp.name }}</u>
        </h3>
        <h4 class="font-xl">
          <i>The {{ charProp.race }} {{ charProp.class }}</i>
        </h4>
        <div class="bg-secondary p-lg-2 p-1 mb-1">
          <div class="position-relative">
            <h5 class="text-overlay font-xl text-shadow">
              Level {{ charProp.level }}
            </h5>
            <img :src="charProp.imgUrl" class="img-fluid" alt="">
          </div>
        </div>
      </div>
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
.text-overlay {
  position: absolute;
  left: 10px;
  top: 5px;
  color: var(--light);
}
</style>
