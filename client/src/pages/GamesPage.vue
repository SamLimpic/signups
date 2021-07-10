<template>
  <div class="games flex-grow-1 container-fluid align-items-center text-center position-relative m-3">
    <i class="fas fa-undo text-dark" v-if="state.game === 2" @click="reload"></i>
    <div class="row justify-content-around" v-if="state.loading || state.load">
      <div class="col-12 p-md-3 px-2 pt-2">
        <h2 class="font-xxl">
          <u>Accessing Current Game Data</u>
        </h2>
        <i class="fas fa-dice-d20 text-warning fa-spin icon mt-3 mb-auto"></i>
      </div>
    </div>
    <div class="row justify-content-around" v-else>
      <div class="col-12 p-md-3 px-2 pt-2" v-if="state.activeCharacter.live">
        <h2 class="font-xxl">
          <u>{{ state.activeCharacter.name }} the {{ state.activeCharacter.race }} {{ state.activeCharacter.class }} has been selected!</u>
        </h2>
        <h3 class="font-xl m-0">
          Here's {{ state.activeCharacter.name }}'s game this week
        </h3>
        <div class="row justify-content-around">
          <GameList :game-prop="state.activeGame" :live-prop="!state.loading" />
        </div>
      </div>
      <div class="col-12 p-md-3 px-2 pt-2" v-else-if="state.activeCharacter.liveGames[0]">
        <h2 class="font-xxl m-0">
          <u>Here are your final selections!</u>
        </h2>
        <h3 class="font-xl m-0">
          Check back Sunday for the official roster
        </h3>
        <div class="row justify-content-around mt-1">
          <GameList v-for="(g, index) in state.activeCharacter.liveGames" :key="g.id" :game-prop="g" :index-prop="index + 1" :live-prop="!state.loading" />
        </div>
      </div>
      <div class="col-xl-8 col-lg-9 col-md-10 col-11 p-md-3 px-2 pt-2" v-else-if="!state.characters[0]">
        <h2 class="font-xxl">
          <u>You don't have any characters to play with!</u>
        </h2>
        <h3 class="font-xl mb-3">
          You'll have to register one before you can sign up...
        </h3>
        <CreateCharacter />
      </div>
      <div class="col-12 p-md-3 px-2 pt-2" v-else-if="!state.activeCharacter.id">
        <h2 class="font-xxl m-0">
          <u>Which character do you want to play this week?</u>
        </h2>
        <h3 class="font-xl m-0">
          You can change this once games are finalized
        </h3>
        <div class="row justify-content-around">
          <CharacterList v-for="c in state.characters" :key="c.id" :char-prop="c" />
        </div>
      </div>
      <div class="col-12 p-md-3 px-2 pt-2" v-else-if="state.game < 2">
        <h2 class="font-xxl">
          <u>When are you available to play?</u>
        </h2>
        <div class="text-center">
          <button type="button" class="btn btn-lg btn-light font-xl" @click="selectAll">
            Show Me Everything!
          </button>
        </div>
        <h3 class="font-xl m-0 mt-4">
          What day of the week is best?
        </h3>
        <div class="row justify-content-center">
          <div class="col-md-3 col-sm-5 col-6 mt-md-2 mt-3">
            <button type="button" class="day btn btn-primary border-0 font-lg w-100" @click="selectDay('Monday')">
              Monday
            </button>
          </div>
          <div class="col-md-3 col-sm-5 col-6 mt-md-2 mt-3">
            <button type="button" class="day btn btn-secondary font-lg w-100" @click="selectDay('Tuesday')">
              Tuesday
            </button>
          </div>
          <div class="col-md-3 col-sm-5 col-6 mt-md-2 mt-3">
            <button type="button" class="day btn btn-dark font-lg w-100" @click="selectDay('Either')">
              Either One
            </button>
          </div>
        </div>
        <h3 class="font-xl m-0 mt-4">
          How many weeks can you play?
        </h3>
        <div class="row justify-content-center">
          <div class="col-md-3 col-sm-5 col-6 mt-md-2 mt-3">
            <button type="button" id="one" class="week btn btn-info font-lg w-100" @click="selectWeek(1)">
              One Week
            </button>
          </div>
          <div class="col-md-3 col-sm-5 col-6 mt-md-2 mt-3">
            <button type="button" id="two" class="week btn btn-warning font-lg w-100" @click="selectWeek(2)">
              Two Weeks
            </button>
          </div>
          <div class="col-md-3 col-sm-5 col-6 mt-md-2 mt-3">
            <button type="button" id="three" class="week btn btn-success font-lg w-100" @click="selectWeek(3)">
              Three Weeks
            </button>
          </div>
          <div class="col-md-3 col-sm-5 col-6 mt-md-2 mt-3">
            <button type="button" id="four" class="week btn btn-danger font-lg w-100" @click="selectWeek(4)">
              Four Weeks
            </button>
          </div>
        </div>
      </div>
      <div class="col-12 p-md-3 px-2 pt-2" v-else-if="(state.choice + state.removed) <= state.games.length">
        <h2 class="font-xxl m-0">
          <u>Here is this week's selection!</u>
        </h2>
        <h3 class="font-xl">
          Select each game in your preferred order, or remove any you aren't interested in
        </h3>
        <h4 class="font-lg">
          The more games you select, the better chance you have at playing!
        </h4>
        <h4 class="font-lg mb-1">
          <i>Current Total: {{ state.games.length }}</i>
        </h4>
        <div class="row justify-content-center">
          <div class="col-sm-4 col-6 text-right">
            <div class="dropdown dropright">
              <button
                id="sort"
                class="btn btn-lg btn-light font-xl dropdown-toggle py-1 px-3"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sort
              </button>
              <div class="dropdown-menu shadow m-0 p-0 ml-2" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item font-md hoverable bg-primary border text-light text-shadow pl-2" id="reset" @click="sort('reset')">
                  <i class="fas fa-dungeon pr-2"></i> Reset</a>
                <a class="dropdown-item drop-light font-md hoverable text-primary pl-2" id="day" @click="sort('day')" v-if="state.day === true">
                  <i class="far fa-clock pr-2"></i> Day</a>
                <a class="dropdown-item drop-light font-md hoverable text-danger pl-2" id="length" @click="sort('length')">
                  <i class="fas fa-history pr-2" v-if="state.week > 1"></i> Length</a>
                <a class="dropdown-item drop-light font-md hoverable text-success pl-2" id="experience" @click="sort('experience')">
                  <i class="fas fa-star-half-alt pr-2"></i> Experience</a>
                <a class="dropdown-item drop-light font-md hoverable text-secondary pl-2" id="size" @click="sort('size')">
                  <i class="fas fa-dice-d20 pr-2"></i> Max Players</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item drop-light font-md hoverable text-info pl-2" id="masked" @click="sort('masked')">
                  <i class="fas fa-shield-virus pr-2"></i> Masked</a>
                <a class="dropdown-item drop-light font-md hoverable text-warning pl-2" id="outdoor" @click="sort('outdoor')">
                  <i class="fa fa-sun pr-2"></i> Outdoor</a>
              </div>
            </div>
          </div>
          <div class="col-sm-4 col-6 text-left">
            <button type="button" id="show" class="btn btn-lg btn-primary font-xl sorted py-1 px-3">
              Show All
            </button>
          </div>
        </div>
        <div class="row justify-content-around mt-1">
          <GameList v-for="g in state.games" :key="g.id" :game-prop="g" />
        </div>
      </div>
      <div class="col-12 p-md-3 px-2 pt-2" v-else-if="state.choice === 0">
        <h2 class="font-xxl m-0">
          <u>Think you're funny huh?</u>
        </h2>
        <h3 class="font-xl mb-4">
          I'll be nice and let you try again...
        </h3>
        <h3><i class="fas fa-dragon text-danger icon mb-1"></i></h3>
        <button type="button" class="btn btn-primary font-xl mb-lg-3 mb-2" @click="reload">
          Restart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { gamesService } from '../services/GamesService'
import Notification from '../utils/Notification'
import { charactersService } from '../services/CharactersService'
import { valuesService } from '../services/ValuesService'

export default {
  name: 'Games',
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      characters: computed(() => AppState.characters),
      activeCharacter: computed(() => AppState.activeCharacter),
      activeGame: computed(() => AppState.activeGame),
      games: computed(() => AppState.games),
      liveGames: computed(() => AppState.liveGames),
      choices: computed(() => AppState.choices),
      choice: computed(() => AppState.count.choice),
      removed: computed(() => AppState.count.removed),
      game: computed(() => AppState.count.game),
      load: computed(() => AppState.load),
      loading: true,
      show: {
        size: false,
        day: false,
        length: false,
        experience: false,
        masked: false,
        outdoor: false
      },
      day: true,
      week: 4,
      masked: false,
      outdoor: false
    })
    onMounted(async() => {
      try {
        await valuesService.getValues()
        await gamesService.getGames()
        AppState.liveGames = AppState.games
        setTimeout(function() { state.loading = false }, AppState.timer)
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state,
      reload() {
        try {
          setTimeout(function() { location.reload() }, AppState.timer)
          Notification.toast('Mock the Dragon at your peril', 'warning')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async selectAll() {
        await gamesService.getGames()
        AppState.liveGames = AppState.games
        AppState.games.forEach(g => {
          if (g.masked) {
            state.masked = true
          }
          if (g.outdoor) {
            state.outdoor = true
          }
        })
        AppState.count.game = 2
        Notification.toast('Showing all available games this week', 'info')
      },
      selectDay(day) {
        AppState.count.game++
        if (day !== 'Either') {
          AppState.games = AppState.games.filter(g => g.day === day)
          AppState.liveGames = AppState.games
          AppState.games.forEach(g => {
            if (g.masked) {
              state.masked = true
            }
            if (g.outdoor) {
              state.outdoor = true
            }
          })
          state.day = day
          Notification.toast(`Showing only games on ${day}`, 'info')
        } else {
          Notification.toast('Showing all available games on both Monday and Tuesday', 'info')
        }
        const arr = Array.from(document.getElementsByClassName('day'))
        arr.forEach(d => {
          d.disabled = true
        })
      },
      selectWeek(week) {
        AppState.count.game++
        AppState.games = AppState.games.filter(g => g.length <= week)
        AppState.liveGames = AppState.games
        AppState.games.forEach(g => {
          if (g.masked) {
            state.masked = true
          }
          if (g.outdoor) {
            state.outdoor = true
          }
        })
        if (week === 1) {
          Notification.toast(`Showing only games lasting ${week} week`, 'info')
        } else {
          Notification.toast(`Showing only games lasting a max of ${week} weeks`, 'info')
        }
        state.week = week
        const arr = Array.from(document.getElementsByClassName('week'))
        arr.forEach(d => {
          d.disabled = true
        })
      },
      sort(string) {
        const arr = Array.from(document.getElementsByClassName('drop-light'))
        arr.forEach(d => {
          d.classList.remove('bg-primary', 'text-light')
        })
        document.getElementById(string).classList.add('bg-primary', 'text-light')
        if (!state.show[string]) {
          switch (string) {
            case 'size':
            case 'length':
            case 'experience':
              AppState.games = AppState.liveGames.sort((a, b) => parseFloat(a[string]) - parseFloat(b[string]))
              document.getElementById('show').innerText = `By ${string[0].toUpperCase() + string.slice(1)}`
              Notification.toast(`Sorted games by ${string[0].toUpperCase() + string.slice(1)}`, 'info')
              break
            case 'day':
              AppState.games = AppState.liveGames.filter(g => g.day === 'Monday')
              document.getElementById('show').innerText = 'Monday'
              Notification.toast('Showing only Monday games', 'info')
              break
            case 'masked':
            case 'outdoor':
              AppState.games = AppState.liveGames.filter(g => g[string])
              document.getElementById('show').innerText = `${string[0].toUpperCase() + string.slice(1)}`
              Notification.toast(`Showing only ${string[0].toUpperCase() + string.slice(1)} games`, 'info')
              break
          }
          document.getElementById('show').classList.add('bg-light', 'text-dark')
          state.show[string] = true
        } else {
          switch (string) {
            case 'size':
            case 'length':
            case 'experience':
              AppState.games = AppState.liveGames.sort((a, b) => parseFloat(b[string]) - parseFloat(a[string]))
              document.getElementById('show').innerText = `By ${string[0].toUpperCase() + string.slice(1)}`
              Notification.toast(`Sorted games by ${string[0].toUpperCase() + string.slice(1)} in reverse`, 'info')
              break
            case 'day':
              AppState.games = AppState.liveGames.filter(g => g.day === 'Tuesday')
              document.getElementById('show').innerText = 'Tuesday'
              Notification.toast('Showing only Tuesday games', 'info')
              break
            case 'masked':
              AppState.games = AppState.liveGames.filter(g => !g[string])
              document.getElementById('show').innerText = 'Unmasked'
              Notification.toast('Showing only Unmasked games', 'info')

              break
            case 'outdoor':
              AppState.games = AppState.liveGames.filter(g => !g[string])
              document.getElementById('show').innerText = 'Indoor'
              Notification.toast('Showing only Indoor games', 'info')
              break
          }
          document.getElementById('show').classList.remove('bg-light', 'text-dark')
          state.show[string] = false
        }
        if (string === 'reset') {
          AppState.games = AppState.liveGames
          document.getElementById('show').innerText = 'Show All'
          document.getElementById('show').classList.remove('bg-light', 'text-dark')
          if (state.day && state.week === 4) {
            Notification.toast('Showing all available games', 'info')
          } else if (state.week === 1) {
            if (state.day === true) {
              Notification.toast('Showing all available games lasting 1 week', 'info')
            } else {
              Notification.toast(`Showing all ${state.day} games lasting 1 week`, 'info')
            }
          } else {
            if (state.day === true) {
              Notification.toast(`Showing all available games lasting a max of ${state.week} weeks`, 'info')
            } else {
              Notification.toast(`Showing all ${state.day} games lasting a max of ${state.week} weeks`, 'info')
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.fa-undo {
  transition: all .5s ease-in-out;
  position: absolute;
  cursor: pointer !important;
  opacity: .25;
  z-index: 10;
}
.fa-undo:hover {
  opacity: 1
}
.btn-light {
  transition: all .5s ease-in-out;
  border-color: var(--primary);
  border-width: 3px;
}
.btn-light:hover {
  background: var(--primary);
  color: var(--light);
}
.btn-light:focus {
  background: var(--primary);
  color: var(--light);
}
.drop-light:hover {
  background: var(--primary) ;
  color: var(--light) !important;
}
.dropdown-menu {
  min-width: 8.5rem;
  border-color: var(--dark);
  border-width: 3px;
}
.hide {
  pointer-events: none;
  cursor: none;
  opacity: .25;
}
.sorted {
  transition: all .5s ease-in-out;
  pointer-events: none;
  cursor: none;
  border-color: var(--dark);
  border-width: 3px;
}

@media (min-width: 0) {
.fa-undo {
top: 0rem;
left: 0rem;
font-size: 1.5rem;
  }
}

@media (min-width: 576px) {
.fa-undo {
top: .25rem;
left: .25rem;
font-size: 2rem;
  }
}

@media (min-width: 768px) {
.fa-undo {
top: .5rem;
left: .5rem;
font-size: 2.5rem;
  }
}

@media (min-width: 992px) {
.fa-undo {
top: .75rem;
left: .75rem;
font-size: 3rem;
  }
}

@media (min-width: 1200px) {
.fa-undo {
top: 1rem;
left: 1rem;
font-size: 3.5rem;
  }
}

</style>
