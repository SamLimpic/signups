<template>
  <!-- ANCHOR Renders available Characters -->
  <div class="col-lg-3 col-md-4 col-6 mt-3 px-sm-3 px-2">
    <div class="row justify-content-between bg-light rounded shadow text-left hoverable mx-0 mb-sm-3 pt-3" @click="select(charProp)">
      <div class="col-12 mb-2">
        <h3 class="font-xl text-center m-0">
          <u>{{ charProp.name }}</u>
        </h3>
        <h4 class="font-lg text-center">
          <i>{{ charProp.race }} {{ charProp.class }}</i>
        </h4>
        <div class="mb-1 mx-xl-4 mb-xl-4 mx-md-3 mb-md-3 mx-sm-2 mb-sm-3">
          <div class="img-container position-relative">
            <h5 class="text-overlay font-xl text-shadow">
              Level {{ charProp.level }}
            </h5>
            <img :src="charProp.imgUrl" class="bg-secondary p-lg-2 p-1 shadow rounded" alt="">
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
  left: 15px;
  top: 10px;
  color: var(--light);
  z-index: 10;
}

.img-container::after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
