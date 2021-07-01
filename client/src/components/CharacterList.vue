<template>
  <!-- ANCHOR Renders available Characters -->
  <div class="col-lg-3 col-md-4 col-sm-5 col-6 mt-3 px-md-3 px-sm-0 px-2">
    <div class="row justify-content-between bg-light rounded shadow text-left hoverable mx-0 mb-sm-3 pt-3" @click="select(charProp)" v-if="!liveProp">
      <div class="col-12 mb-2">
        <h3 class="font-xl text-center m-0">
          <u>{{ charProp.name }}</u>
        </h3>
        <h4 class="font-md text-center">
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
    <div class="row justify-content-between bg-light rounded shadow text-left mx-0 mb-sm-3 pt-3" v-else-if="charProp.dead">
      <div class="character col-12 position-relative mb-2">
        <i class="live-overlay fas fa-skull text-danger font-lg hoverable"></i>
        <i class="fas fa-skull"></i>
        <h3 class="font-xl text-center m-0 pt-sm-3 pt-2">
          <u>{{ charProp.name }}</u>
        </h3>
        <h4 class="font-md text-center">
          <i>{{ charProp.race }} {{ charProp.class }}</i>
        </h4>
        <div class="mb-1 mx-xl-4 mb-xl-4 mx-md-3 mb-md-3 mx-sm-2 mb-sm-3">
          <div class="img-container position-relative">
            <h5 class="text-overlay font-xl text-shadow">
              Killed {{ charProp.killedAt.substring(5, 10) }}
            </h5>
            <img :src="charProp.imgUrl" class="bg-secondary p-lg-2 p-1 shadow rounded" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-between bg-light rounded shadow text-left mx-0 mb-sm-3 pt-3" v-else>
      <div class="character col-12 position-relative mb-2">
        <i class="live-overlay fas fa-dice-d20 font-lg hoverable" v-if="charProp.liveGames[0]"></i>
        <i class="btn-overlay fas fa-scroll font-lg hoverable" @click="edit(charProp)"></i>
        <h3 class="font-xl text-center m-0 pt-sm-3 pt-2">
          <u>{{ charProp.name }}</u>
        </h3>
        <h4 class="font-md text-center">
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
import { charactersService } from '../services/CharactersService'
import Notification from '../utils/Notification'

export default {
  name: 'CharacterList',
  props: {
    charProp: {
      type: Object,
      required: true
    },
    liveProp: {
      type: Boolean,
      default: false
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
      },
      async edit(character) {
        try {
          AppState.activeCharacter = character
          await Notification.character()
          await charactersService.editCharacter(AppState.activeCharacter)
          Notification.toast('Your changes have been saved!', 'success')
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

.live-overlay {
  transition: all .5s ease-in-out;
  position: absolute;
  left: 10px;
  top: -5px;
  color: var(--warning);
  z-index: 10;
}

.live-overlay:hover {
  color: var(--success);
}

.btn-overlay {
  transition: all .5s ease-in-out;
  position: absolute;
  right: 10px;
  top: -5px;
  color: var(--warning);
  z-index: 10;
  opacity: 0;
}

.character:hover .btn-overlay {
  opacity: 1;
}

.btn-overlay:hover {
  color: var(--success);
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
