<template>
  <!-- ANCHOR Renders available Characters -->
  <div class="col-lg-3 col-md-4 col-sm-5 col-6 px-md-3 p-2">
    <div class="row justify-content-between bg-light rounded shadow text-left mx-0 mb-sm-3 pt-3" :class="{'hoverable': !liveProp}" v-on="!liveProp ? { click: () => select(charProp) } : {}">
      <div class="character col-12 position-relative mb-2 pt-sm-0 pt-1">
        <h5 class="text-overlay text-muted font-md">
          Level {{ charProp.level }}
        </h5>
        <h5 class="exp-overlay text-muted font-md">
          {{ charProp.experience }} <span class="font-xs">EXP</span>
        </h5>
        <i class="live-overlay fas fa-skull text-danger font-lg" v-if="charProp.dead"></i>
        <i class="live-overlay fas fa-dice-d20 font-lg" v-else-if="charProp.liveGames[0]"></i>
        <i class="live-overlay fas fa-dice-d20 text-success font-lg" v-else-if="charProp.live"></i>
        <i class="btn-overlay fas fa-scroll font-lg hoverable" @click="edit(charProp)" v-if="!charProp.dead && liveProp"></i>
        <h3 class="font-xl text-center m-0 pt-sm-3 pt-2">
          <u>{{ charProp.name }}</u>
        </h3>
        <h4 class="font-md text-center">
          <i>{{ charProp.race }} {{ charProp.class }}</i>
        </h4>
        <div class="mb-1 mx-xl-4 mb-xl-4 mx-md-3 mb-md-3 mx-sm-2 mb-sm-3">
          <div class="img-container position-relative">
            <img :src="charProp.imgUrl" class="bg-secondary p-lg-2 p-1 shadow rounded" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../../AppState'
import { charactersService } from '../../services/CharactersService'
import Notification from '../../utils/Notification'

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
  transition: opacity .5s ease-in-out;
  top: -.5rem;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 10;
  opacity: 1;
}
.exp-overlay {
  position: absolute;
  transition: opacity .5s ease-in-out;
  top: -.5rem;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 10;
  opacity: 0;
}
.character:hover .text-overlay {
  opacity: 0;
}
.character:hover .exp-overlay {
  opacity: 1;
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
