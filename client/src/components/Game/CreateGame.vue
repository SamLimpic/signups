<template>
  <form class="row justify-content-around bg-light rounded shadow p-3">
    <div class="col-lg-6 col-12">
      <div class="form-group font-md">
        <label>Game Title</label>
        <input type="text" class="form-control font-sm" placeholder="I expect puns..." v-model="state.activeGame.title">
      </div>
      <div class="form-group font-md">
        <label>Game Description</label>
        <textarea class="form-control font-sm" rows="3" placeholder="Hit me with that purple prose!" v-model="state.activeGame.description"></textarea>
      </div>
    </div>
    <div class="col-lg-6 col-12">
      <div class="row justify-content-around">
        <div class="form-group col-lg-5 col-sm-4 col-4 font-md">
          <label>Weeks</label>
          <select class="form-control font-sm" v-model="state.activeGame.length">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>
        <div class="form-group col-lg-7 col-sm-4 col-8 font-md">
          <label>Experience</label>
          <select class="form-control font-sm" v-model="state.activeGame.experience">
            <ExperienceDrop v-for="e in state.experience" :key="e" :exp-prop="e" />
          </select>
        </div>
        <div class="form-group col-lg-5 col-sm-4 col-4 font-md">
          <label>Players</label>
          <input type="number"
                 class="form-control font-sm"
                 min="5"
                 max="20"
                 placeholder="5"
                 v-model="state.activeGame.size"
          >
        </div>
        <div class="form-group col-lg-7 col-md-6 col-sm-6 col-8 font-md">
          <label>Date</label>
          <input type="date"
                 class="form-control font-sm"
                 v-model="state.activeGame.date"
          >
        </div>
        <div class="form-group col-lg-7 col-md-6 col-sm-6 col-5 text-left font-md pl-lg-3 pl-md-4 pl-sm-2 pl-3 pr-0 pt-lg-0 pt-sm-4 mb-0">
          <div class="form-check form-check-inline m-0 pr-md-3 pr-md-3 pr-sm-2 pr-2 mt-lg-2 mt-sm-3 pt-sm-0 pt-1">
            <input class="form-check-input ml-md-0 ml-sm-2 ml-0" type="checkbox" v-model="state.activeGame.outdoor">
            <label class="form-check-label">Outdoor</label>
          </div>
          <div class="form-check form-check-inline m-0 mt-lg-2 mt-sm-3 mt-0">
            <input class="form-check-input ml-md-0 ml-sm-2 ml-0" type="checkbox" v-model="state.activeGame.masked">
            <label class="form-check-label">Masked</label>
          </div>
        </div>
        <div class="form-group col-lg-5 col-md-6 col-7 text-sm-right text-center mt-lg-auto pb-sm-2 mt-sm-3 mt-auto mb-2" v-if="state.activeGame.date">
          <button type="button" class="btn btn-success font-xs w-100" @click="addGame" v-if="state.activeGame.date">
            CONFIRM
          </button>
          <button type="button" class="btn btn-success font-xs w-100" disabled v-else>
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../../AppState'
import { gamesService } from '../../services/GamesService'
import Notification from '../../utils/Notification'

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
      values: computed(() => AppState.values),
      activeGame: computed(() => AppState.activeGame),
      experience: []
    })
    onMounted(async() => {
      try {
        const min = state.values.expMin
        const max = state.values.expMax
        for (let i = min; i <= max; i += 50) {
          state.experience.push(i)
        }
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state,
      async addGame() {
        try {
          if (state.account.dm) {
            if (state.activeGame.id) {
              await gamesService.editGame(state.activeGame.id, state.activeGame)
              Notification.toast('Your Game has been Edited!', 'success')
            } else {
              await gamesService.createGame(state.activeGame)
              Notification.toast('Your Game has been Saved!', 'success')
            }
          } else {
            Notification.toast('Only DMs can create Games!', 'error')
          }
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
