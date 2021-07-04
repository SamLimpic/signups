<template>
  <!-- ANCHOR Renders available Games -->
  <div :id="gameProp.id + '-card'" class="col-md-6 col-12 px-md-3 py-md-4 px-2 py-3">
    <div class="row justify-content-end position-relative bg-light rounded shadow h-100 m-sm-2 mx-3 mb-2 p-sm-2 p-1">
      <div :class="{'right cover': !liveProp, 'right-sm cover-sm': liveProp}" class="right col-12 text-left cover pt-2">
        <h3 class="font-sm m-0" v-if="liveProp">
          [ {{ gameProp.day }} ]
        </h3>
        <h3 class="font-sm m-0" v-else>
          [ {{ gameProp.size }} Players ]
        </h3>
        <h4 class="font-xl m-0">
          {{ gameProp.title }}
        </h4>
        <h5 class="font-sm px-md-3 px-1">
          <i>By {{ gameProp.creator.name }}</i>
        </h5>
        <div class="b-line mb-2" />
        <h6 class="font-md px-md-3 px-1 mb-0">
          {{ gameProp.description }}
        </h6>
      </div>
      <div :class="{'btn-cover': !liveProp || gameProp.players[0]}" class="col-12 position-relative">
        <div class="dropdown dropup btn-right">
          <button id="players"
                  class="btn btn-info dropdown-toggle font-md py-1"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  v-if="gameProp.players[0]"
          >
            Players
          </button>
          <div class="dropdown-menu dropdown-menu-right m-0 p-0 mb-2" aria-labelledby="dropdownMenuButton">
            <CharacterDrop v-for="(c) in gameProp.players" :key="c.id" :drop-prop="c.name" :live-prop="!state.loading" />
          </div>
        </div>
        <button type="button" :id="gameProp.id" class="btn btn-success btn-left font-md py-1" @click="select(state.choice, gameProp)" v-if="!liveProp">
          Select
        </button>
        <button type="button" :id="gameProp.id + '-remove'" class="btn btn-danger btn-right font-md py-1" @click="select(-1, gameProp)" v-if="!liveProp">
          Remove
        </button>
      </div>
      <div class="icons rounded shadow px-2 pt-2 pb-1 text-left">
        <p class="text-primary pl-1 m-0" v-if="liveProp">
          <i class="fas fa-dice-d20 font-lg pr-2"></i>
          <span class="font-sm pr-1">Choice {{ indexProp }} </span>
        </p>
        <p class="text-primary pl-1 m-0" v-else-if="gameProp.live">
          <i class="far fa-clock font-lg pr-2"></i>
          <span class="font-sm pr-1">{{ gameProp.day }} </span>
        </p>
        <p class="text-muted pl-1 m-0" v-else>
          <i class="fas fa-clock font-lg pr-2"></i>
          <span class="font-sm pr-1">{{ gameProp.day }} </span>`
        </p>
        <p class="text-danger pl-1 m-0">
          <i class="fas fa-history font-lg pr-2"></i>
          <span class="font-sm pr-1">{{ gameProp.length }} Week</span>
        </p>
        <p class="text-success pl-1 m-0">
          <i class="fas fa-star-half-alt font-lg pr-2"></i>
          <span class="font-sm pr-1">{{ gameProp.experience }} Exp</span>
        </p>
        <p class="text-info pl-1 m-0" v-if="gameProp.masked">
          <i class="fas fa-shield-virus font-lg pr-2"></i>
          <span class="font-sm pr-1">Masked</span>
        </p>
        <p class="text-warning pl-1 m-0" v-if="gameProp.outdoor">
          <i class="fa fa-sun font-lg pr-2"></i>
          <span class="font-sm pr-1">Outdoor</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../../AppState'
import Notification from '../../utils/Notification'
import { charactersService } from '../../services/CharactersService'
import { accountService } from '../../services/AccountService'

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
      characters: computed(() => AppState.characters),
      choice: computed(() => AppState.count.choice),
      removed: computed(() => AppState.count.removed)
    })
    onMounted(async() => {

    })
    return {
      state,
      async select(num, game) {
        try {
          document.getElementById('sort').disabled = true
          document.getElementById('sort').classList.add('hide')
          document.getElementById('show').disabled = true
          document.getElementById('show').classList.add('hide')
          if (num === -1) {
            document.getElementById(`${game.id}-remove`).innerText = 'Removed'
            document.getElementById(`${game.id}-remove`).disabled = true
            document.getElementById(`${game.id}`).disabled = true
            document.getElementById(`${game.id}`).classList.add('remove')
            document.getElementById(`${game.id}-card`).classList.add('fade')
            Notification.toast(`${game.title} has been removed!`, 'warning')
            AppState.count.removed++
          } else {
            game.choice = num
            AppState.choices.push(game)
            document.getElementById(`${game.id}-remove`).disabled = true
            document.getElementById(`${game.id}-remove`).classList.add('remove')
            document.getElementById(`${game.id}`).innerText = `Choice ${num + 1}`
            document.getElementById(`${game.id}`).disabled = true
            document.getElementById(`${game.id}-card`).classList.add('fade')
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
  background: lighten(#daccac, 20%);
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
.dropdown-menu {
  pointer-events: none;
  min-width: 7rem;
}
@media (min-width: 0) {
.cover {
  min-height: 7.5rem;
}
.btn-cover {
  min-height: 3rem;
}
.icons {
  right: -.5rem;
  top: -.5rem;
}
.right {
  padding-right: 6.5rem;
}
.btn-left {
  width: 6.5rem;
  bottom: .5rem;
  left: .5rem;
}
.btn-right {
  width: 6.5rem;
  bottom: .5rem;
  right: .5rem;
}
.cover-sm {
  min-height: 7.25rem;
}
.right-sm {
  padding-right: 6.75rem;
}
}

@media (min-width: 576px) {
.cover {
  min-height: 6.75rem;
}
.btn-cover {
  min-height: 3.25rem;
}
.icons {
  right: -.75rem;
  top: -.75rem;
}
.right {
  padding-right: 6.75rem;
}
.btn-left {
  width: 6.75rem;
  bottom: .25rem;
  left: .25rem;
}
.btn-right {
  width: 6.75rem;
  bottom: .25rem;
  right: .25rem;
}
.cover-sm {
  min-height: 6.5rem;
}
.right-sm {
  padding-right: 6.75rem;
}
}

@media (min-width: 768px) {
.cover {
  min-height: 8.75rem;
}
.btn-cover {
  min-height: 3.25rem;
}
.icons {
  right: -.75rem;
  top: -.75rem;
}
.right {
  padding-right: 7.25rem;
}
.btn-left {
  width: 7.25rem;
  bottom: .5rem;
  left: .5rem;
}
.btn-right {
  width: 7.25rem;
  bottom: .5rem;
  right: .5rem;
}
.cover-sm {
  min-height: 7.75rem;
}
.right-sm {
  padding-right: 7.5rem;
}
}

@media (min-width: 992px) {
.cover {
  min-height: 10.25rem;
}
.btn-cover {
  min-height: 3.5rem;
}
.icons {
  right: -.75rem;
  top: -.75rem;
}
.right {
  padding-right: 8rem;
}
.btn-left {
  width: 8rem;
  bottom: .5rem;
  left: .5rem;
}
.btn-right {
  width: 8rem;
  bottom: .5rem;
  right: .5rem;
}
.cover-sm {
  min-height: 9rem;
}
.right-sm {
  padding-right: 8rem;
}
}

@media (min-width: 1200px) {
.cover {
  min-height: 12rem;
}
.btn-cover {
  min-height: 4rem;
}
.icons {
  right: -.75rem;
  top: -.75rem;
}
.right {
  padding-right: 8.75rem;
}
.btn-left {
  width: 8.75rem;
  bottom: .75rem;
  left: .75rem;
}
.btn-right {
  width: 8.75rem;
  bottom: .75rem;
  right: .75rem;
}
.cover-sm {
  min-height: 10.75rem;
}
.right-sm {
  padding-right: 8.75rem;
}
}
</style>
