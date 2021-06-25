<template>
  <!-- ANCHOR Renders available Games -->
  <form class="row justify-content-around bg-light m-sm-3 m-md-2 mt-3 py-3 px-md-3 px-2">
    <div class="col-lg-6 col-12">
      <div class="form-group font-md">
        <label>Game Title</label>
        <input type="text" class="form-control font-sm" placeholder="I expect puns..." v-model="state.activeGame.title">
      </div>
      <div class="form-group font-md">
        <label>Game Description</label>
        <textarea class="form-control font-sm" rows="4" placeholder="Hit me with that purple prose!" v-model="state.activeGame.description"></textarea>
      </div>
    </div>
    <div class="col-lg-6 col-12">
      <div class="row justify-content-around">
        <div class="form-group col-lg-6 col-sm-4 col-5 font-md">
          <label>Weeks</label>
          <select class="form-control font-sm" v-model="state.activeGame.length">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>
        <div class="form-group col-lg-6 col-sm-4 col-7 font-md">
          <label>Experience</label>
          <select class="form-control font-sm" v-model="state.activeGame.experience">
            <option>250</option>
            <option>300</option>
            <option>350</option>
            <option>400</option>
            <option>450</option>
            <option>500</option>
          </select>
        </div>
        <div class="form-group col-sm-4 col-5 font-md">
          <label>Players</label>
          <input type="number"
                 class="form-control font-sm"
                 min="5"
                 max="20"
                 placeholder="5"
                 v-model="state.activeGame.size"
          >
        </div>
        <div class="form-group col-lg-8 col-md-6 col-sm-7 col-12 text-left font-md d-md-block d-none mt-md-5 mt-sm-5 mt-sm-1 mt-2">
          <div class="form-check form-check-inline m-0 ml-2 mt-xl-3 mt-lg-1">
            <input class="form-check-input" type="checkbox" v-model="state.activeGame.outdoor">
            <label class="form-check-label">Outdoor</label>
          </div>
          <div class="form-check form-check-inline m-0 ml-2 mt-xl-3 mt-lg-1">
            <input class="form-check-input ml-md-2" type="checkbox" v-model="state.activeGame.masked">
            <label class="form-check-label">Masked</label>
          </div>
        </div>
        <div class="form-group col-sm-5 col-7 text-left font-md d-md-none d-block">
          <div class="form-check form-check-inline m-0 px-3 mt-sm-1">
            <input class="form-check-input ml-sm-3 ml-0" type="checkbox" v-model="state.activeGame.outdoor">
            <label class="form-check-label">Outdoor</label>
          </div>
          <div class="form-check form-check-inline m-0 px-3 mt-sm-0 mt-2">
            <input class="form-check-input ml-sm-3 ml-0" type="checkbox" v-model="state.activeGame.masked">
            <label class="form-check-label">Masked</label>
          </div>
        </div>
        <div class="form-group col-lg-8 col-md-6 col-sm-7 col-12 font-md">
          <label>Date</label>
          <input type="date"
                 class="form-control font-sm"
                 v-model="state.activeGame.date"
          >
        </div>
        <div class="form-group col-md-4 col-sm-5 col-7 text-sm-right text-center mt-lg-auto pb-sm-2 mt-sm-3 mt-2 mb-2" v-if="state.activeGame.date">
          <button type="button" class="btn btn-success font-sm w-100" @click="addGame">
            CONFIRM
          </button>
        </div>
        <div class="form-group col-md-4 col-sm-5 col-7 text-sm-right text-center mt-lg-auto pb-sm-2 mt-sm-3 mt-2 mb-2" v-else>
          <button type="button" class="btn btn-success font-sm w-100" disabled>
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { gamesService } from '../services/GamesService'
import Notification from '../utils/Notification'

export default {
  name: 'CreateGame',
  props: {
    gameProp: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      activeGame: computed(() => AppState.activeGame)
    })
    onMounted(async() => {

    })
    return {
      state,
      addGame() {
        try {
          if (state.account.dm) {
            if (state.activeGame.id) {
              gamesService.editGame(state.activeGame.id, state.activeGame)
              Notification.toast('Your Game has been Edited!', 'success')
            } else {
              gamesService.createGame(state.activeGame)
              Notification.toast('Your Game has been Saved!', 'success')
            }
          } else {
            Notification.toast('Only DMs can create Games!', 'error')
          }
        } catch (error) {
          Notification.toast('Error: ', +error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

@media (min-width: 0) {
  .font-sm {
    font-size: 1.25rem;
  }
  .font-md {
    font-size: 1.5rem;
  }
.form-check-input {
    height: 1.25rem;
    width: 1.25rem;
}
}

@media (min-width: 576px) {
  .font-sm {
    font-size: 1rem;
  }
  .font-md {
    font-size: 1.25rem;
  }
.form-check-input {
    height: 1rem;
    width: 1rem;
}
}

@media (min-width: 768px) {
  .font-sm {
    font-size: 1.25rem;
  }
  .font-md {
    font-size: 1.5rem;
  }
.form-check-input {
    height: 1.25rem;
    width: 1.25rem;
}
}

@media (min-width: 992px) {
  .font-sm {
    font-size: 1.25rem;
  }
  .font-md {
    font-size: 1.5rem;
  }
.form-check-input {
    height: 1.25rem;
    width: 1.25rem;
}
}

@media (min-width: 1200px) {
  .font-sm {
    font-size: 1.75rem;
  }
  .font-md {
    font-size: 2rem;
  }
.form-check-input {
    height: 1.25rem;
    width: 1.25rem;
}
}

</style>
