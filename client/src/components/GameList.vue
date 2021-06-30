<template>
  <!-- ANCHOR Renders available Games -->
  <div :id="gameProp.id + '-card'" class="col-md-6 col-12 p-2">
    <div class="row justify-content-between position-relative bg-light rounded shadow m-sm-2 mx-3 mb-2 p-sm-2 p-1">
      <div class="col-lg-9 col-md-8 col-sm-10 col-9 text-left cover h-100 pt-2">
        <h3 class="font-sm p-0 m-0">
          [ {{ gameProp.size }} Players ]
        </h3>
        <h4 class="font-xl m-0">
          {{ gameProp.title }}
        </h4>
        <h5 class="font-sm">
          <i>By {{ gameProp.creator.name }}</i>
        </h5>
        <div class="b-line m-1 mb-2"></div>
        <h6 class="font-md">
          {{ gameProp.description }}
        </h6>
      </div>
      <div class="col-12 btn-cover position-relative">
        <button type="button" :id="gameProp.id" class="btn btn-success btn-left font-md py-1" @click="select(state.choice, gameProp)" v-if="!liveProp">
          Select
        </button>
        <button type="button" class="btn btn-success btn-left font-md py-1" disabled v-if="liveProp">
          Choice {{ indexProp }}
        </button>
        <button type="button" :id="gameProp.id + '-remove'" class="btn btn-danger btn-right font-md py-1" @click="select(-1, gameProp)" v-if="!liveProp">
          Remove
        </button>
      </div>
    </div>
    <div class="icons text-right">
      <p class="p-0 m-0" v-if="gameProp.live">
        <span class="date-text font-xs">{{ gameProp.date.substring(5, 10) }} </span><i class="far fa-calendar-check font-lg text-primary pl-2"></i>
      </p>
      <p class="p-0 m-0" v-else>
        <span class="past-date-text font-xs">{{ gameProp.date.substring(5, 10) }} </span><i class="far fa-calendar-times font-lg text-secondary pl-2"></i>
      </p>
      <p class="p-0 m-0">
        <span class="week-text font-xs">{{ gameProp.length }} Week</span><i class="fas fa-history font-lg text-danger pl-2"></i>
      </p>
      <p class="p-0 m-0">
        <span class="exp-text font-xs">{{ gameProp.experience }} EXP</span><i class="fas fa-star-half-alt font-lg text-success pl-2"></i>
      </p>
      <p class="p-0 m-0" v-if="gameProp.masked">
        <span class="virus-text font-xs">Masked</span><i class="fas fa-shield-virus font-lg text-info  pl-2"></i>
      </p>
      <p class="p-0 m-0" v-if="gameProp.outdoor">
        <span class="sun-text font-xs">Outdoor</span><i class="fa fa-sun font-lg text-warning pl-2"></i>
      </p>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { charactersService } from '../services/CharactersService'
import { accountService } from '../services/AccountService'

export default {
  name: 'GameList',
  props: {
    gameProp: {
      type: Object,
      required: true
    },
    indexProp: {
      type: Number,
      default: 0
    },
    liveProp: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      activeCharacter: computed(() => AppState.activeCharacter),
      games: computed(() => AppState.games),
      choice: computed(() => AppState.count.choice),
      removed: computed(() => AppState.count.removed)
    })
    onMounted(async() => {

    })
    return {
      state,
      async select(num, game) {
        try {
          if (num === -1) {
            document.getElementById(`${game.id}-remove`).innerText = 'Removed'
            document.getElementById(`${game.id}-remove`).disabled = true
            document.getElementById(`${game.id}`).disabled = true
            document.getElementById(`${game.id}`).classList.add('remove')
            document.getElementById(`${game.id}-card`).classList.add('fade')
            Notification.toast(`${game.title} has been removed!`, 'error')
            AppState.count.removed++
          } else {
            AppState.choices.push(game)
            document.getElementById(`${game.id}-remove`).disabled = true
            document.getElementById(`${game.id}-remove`).classList.add('remove')
            document.getElementById(`${game.id}`).innerText = `Choice ${num + 1}`
            document.getElementById(`${game.id}`).disabled = true
            Notification.toast(`${game.title} is your #${num + 1} choice!`, 'success')
            AppState.count.choice++
          }
          if ((state.choice + state.removed) === state.games.length) {
            if (await Notification.confirmAction('Confirm your selections', `You've signed up for ${state.choice} games and removed ${state.removed} games`, 'info', 'Confirm')) {
              charactersService.setGames(state.activeCharacter)
              accountService.signup(true)
              Notification.toast('Your choices have been saved!', 'success')
            } else {
              location.reload()
            }
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
.icons {
  position: absolute;
  font-family: "Aladin", cursive;
  font-weight:500;
}
.virus-text {
  color: var(--info);
  opacity: .75;
}
.sun-text {
  color: var(--warning);
  opacity: .75;
}
.exp-text {
  color: var(--success);
  opacity: .75;
}
.week-text {
  color: var(--danger);
  opacity: .75;
}
.date-text {
  color: var(--priamry);
  opacity: .75;
}
.past-date-text {
  color: var(--secondary);
  opacity: .75;
}
.remove {
  transition: opacity 1s ease-in-out;
  opacity: 0;
}
.fade {
  transition: opacity 1s ease-in-out;
  opacity: .5;
}
.btn-left {
  position: absolute;
}
.btn-right {
  position: absolute;
}
@media (min-width: 0) {
p {
  height: 2rem;
}
.cover {
  min-height: 10rem;
}
.btn-cover {
  min-height: 3rem;
}
.icons {
  right: 2.25rem;
  top: 1.25rem;
}
.btn-left {
  bottom: .5rem;
  left: .5rem;
}
.btn-right {
  bottom: .5rem;
  right: .5rem;
}
}

@media (min-width: 576px) {
p {
  height: 2.25rem;
}
.cover {
  min-height: 11rem;
}
.btn-cover {
  min-height: 2.75rem;
}
.icons {
  right: 1.75rem;
  top: 1.75rem;
}
.btn-left {
  bottom: .25rem;
  left: .25rem;
}
.btn-right {
  bottom: .25rem;
  right: .25rem;
}
}

@media (min-width: 768px) {
p {
  height: 2.25rem;
}
.cover {
  min-height: 11.5rem;
}
.btn-cover {
  min-height: 3.25rem;
}
.icons {
  right: 2rem;
  top: 2rem;
}
.btn-left {
  bottom: .5rem;
  left: .5rem;
}
.btn-right {
  bottom: .5rem;
  right: .5rem;
}
}

@media (min-width: 992px) {
p {
  height: 2.5rem;
}
.cover {
  min-height: 13rem;
}
.btn-cover {
  min-height: 3.5rem;
}
.icons {
  right: 2.25rem;
  top: 2.25rem;
}
.btn-left {
  bottom: .5rem;
  left: .5rem;
}
.btn-right {
  bottom: .5rem;
  right: .5rem;
}
}

@media (min-width: 1200px) {
p {
  height: 2.75rem;
}
.cover {
  min-height: 15rem;
}
.btn-cover {
  min-height: 4rem;
}
.icons {
  right: 2.5rem;
  top: 2.5rem;
}
.btn-left {
  bottom: .75rem;
  left: .75rem;
}
.btn-right {
  bottom: .75rem;
  right: .75rem;
}
}

</style>
