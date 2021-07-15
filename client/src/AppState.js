import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  // ANCHOR Base Variables
  profile: false,
  built: false,
  load: false,
  timer: 1000,

  // ANCHOR Base Objects
  user: {},
  account: {},
  values: {},
  activeCharacter: {},
  activeGame: {},
  sorted: {},
  roster: {},

  // ANCHOR Base Arrays
  characters: [],
  games: [],
  liveGames: [],
  choices: [],
  graveyard: [],
  total: [],

  // ANCHOR Dictionaries

  count: {
    game: 0,
    choice: 0,
    removed: 0,
    runs: 0,
    check: 0
  }
})
