<template>
  <form :class="{'mt-md-5 mt-4 mb-md-3': indexProp !== 0}" class="row justify-content-around bg-light rounded shadow p-3">
    <div class="col-lg-6 col-12">
      <div class="form-group font-md">
        <label>Game Title</label>
        <input type="text" class="form-control font-sm" placeholder="I expect puns..." v-model="state.activeGames[indexProp].title">
      </div>
      <div class="form-group font-md">
        <label>Game Description</label>
        <textarea class="form-control font-sm" rows="3" placeholder="Hit me with that purple prose!" v-model="state.activeGames[indexProp].description"></textarea>
      </div>
    </div>
    <div class="col-lg-6 col-12">
      <div class="row justify-content-around">
        <div class="form-group col-lg-5 col-sm-4 col-4 font-md">
          <label>Weeks</label>
          <select class="form-control font-sm" v-model="state.activeGames[indexProp].length">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>
        <div class="form-group col-lg-7 col-sm-4 col-8 font-md">
          <label>Experience</label>
          <select class="form-control font-sm" v-model="state.activeGames[indexProp].experience">
            <ValuesDrop v-for="e in state.experience" :key="e" :exp-prop="e" />
          </select>
        </div>
        <div class="form-group col-lg-5 col-sm-4 col-4 font-md">
          <label>Players</label>
          <input type="number"
                 class="form-control font-sm"
                 min="5"
                 max="20"
                 placeholder="5"
                 v-model="state.activeGames[indexProp].size"
          >
        </div>
        <div class="form-group col-lg-7 col-md-6 col-sm-6 col-8 font-md">
          <label>{{ state.activeGames[indexProp].day }}</label>
          <input type="date"
                 class="form-control font-sm"
                 v-model="state.activeGames[indexProp].date"
          >
        </div>
        <div class="form-group col-lg-7 col-md-6 col-sm-6 col-5 text-left font-md pl-lg-3 pl-md-4 pl-sm-2 pl-3 pr-0 pt-lg-0 pt-sm-4 mb-0">
          <div class="form-check form-check-inline m-0 pr-md-3 pr-md-3 pr-sm-2 pr-2 mt-lg-2 mt-sm-3 pt-sm-0 pt-1">
            <input class="form-check-input ml-md-0 ml-sm-2 ml-0" type="checkbox" v-model="state.activeGames[indexProp].outdoor">
            <label class="form-check-label">Outdoor</label>
          </div>
          <div class="form-check form-check-inline m-0 mt-lg-2 mt-sm-3 mt-0">
            <input class="form-check-input ml-md-0 ml-sm-2 ml-0" type="checkbox" v-model="state.activeGames[indexProp].masked">
            <label class="form-check-label">Masked</label>
          </div>
        </div>
        <div class="form-group col-lg-5 col-md-6 col-7 text-sm-right text-center mt-lg-auto pb-sm-2 mt-sm-3 mt-auto mb-2" v-if="state.activeGames[indexProp].date">
          <button type="button" class="btn btn-success font-xs w-100" @click="addGame(state.activeGames[indexProp])" v-if="state.activeGames[indexProp].date">
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
    indexProp: {
      type: Number,
      required: true
    }
  },
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      values: computed(() => AppState.values),
      activeGames: computed(() => AppState.activeGames),
      experience: []
    })
    onMounted(async() => {
      try {
        const min = state.values.min
        const max = state.values.max
        const int = state.values.interval
        for (let i = min; i <= max; i += int) {
          state.experience.push(i)
        }
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state,
      async addGame(game) {
        try {
          if (state.account.dm) {
            if (game.id) {
              await gamesService.editGame(game.id, game)
              Notification.toast('Your Game has been Edited!', 'success')
            } else {
              await gamesService.createGame(game)
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
