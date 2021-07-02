<template>
  <div class="row justify-content-around p-3" v-if="state.activeCharacter.name && state.activeCharacter.race && state.activeCharacter.class">
    <div class="col-12 bg-light rounded shadow py-4">
      <h4 class="font-xxl mb-3">
        <u>Register {{ state.activeCharacter.name }}, the {{ state.activeCharacter.race }} {{ state.activeCharacter.class }}?</u>
      </h4>
      <button type="button" id="create" class="btn btn-primary font-xl my-2" @click="createCharacter">
        Confirm
      </button>
    </div>
  </div>
  <form class="row justify-content-around bg-light rounded shadow p-3" v-else>
    <div class="col-sm-10 col-12">
      <div class="form-group font-xl">
        <label>Character Name</label>
        <input type="text" class="form-control font-xl" placeholder="" v-model="state.activeCharacter.name">
      </div>
    </div>
    <div class="col-6 px-0 py-2">
      <div class="dropdown dropup">
        <h3 class="font-xl pb-2">
          Character Race
        </h3>
        <button id="race"
                class="btn btn-primary font-md dropdown-toggle mb-sm-2"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                disabled
                v-if="!state.activeCharacter.name"
        >
          Choose Race
        </button>
        <button id="race"
                class="btn btn-primary font-md dropdown-toggle mb-sm-2"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                v-else
        >
          Choose Race
        </button>
        <div class="dropdown-menu dropdown-menu-right m-0 p-0 mb-2" aria-labelledby="dropdownMenuButton">
          <CharacterDrop v-for="(r, index) in state.races" :key="index" :drop-prop="r" type-prop="Race" />
        </div>
      </div>
    </div>
    <div class="col-6 px-0 py-2">
      <div class="dropdown dropup">
        <h3 class="font-xl pb-2">
          Character Class
        </h3>
        <button id="class"
                class="btn btn-primary font-md dropdown-toggle mb-sm-2"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                disabled
                v-if="!state.activeCharacter.name"
        >
          Choose Class
        </button>
        <button id="class"
                class="btn btn-primary font-md dropdown-toggle mb-sm-2"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                v-else
        >
          Choose Class
        </button>
        <div class="dropdown-menu dropdown-menu-right m-0 p-0 mb-2" aria-labelledby="dropdownMenuButton">
          <CharacterDrop v-for="(c, index) in state.classes" :key="index" :drop-prop="c" type-prop="Class" />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../../AppState'
import { charactersService } from '../../services/CharactersService'
import Notification from '../../utils/Notification'

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
      state,
      async createCharacter() {
        try {
          document.getElementById('create').disabled = true
          await charactersService.createCharacter(AppState.activeCharacter)
          Notification.toast(`${AppState.activeCharacter.name}, the ${AppState.activeCharacter.race} ${AppState.activeCharacter.class} has been registered!`, 'success')
          await charactersService.getCharactersByCreatorId(AppState.account.id)
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
.dropdown-menu {
    height: auto;
    overflow-y: scroll;
    min-width: 7rem;
}
@media (min-width: 0) {
.dropdown-menu {
    max-height: 21vh;
}
}

@media (min-width: 576px) {
.dropdown-menu {
    max-height: 21vh;
}
}

@media (min-width: 768px) {
.dropdown-menu {
    max-height: 23vh;
}
}

@media (min-width: 992px) {
.dropdown-menu {
    max-height: 25vh;
}
}

@media (min-width: 1200px) {
.dropdown-menu {
    max-height: 27vh;
}
}

</style>
