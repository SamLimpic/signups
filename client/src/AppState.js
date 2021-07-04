import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  // ANCHOR Base Variables
  profile: false,

  // ANCHOR Base Objects
  user: {},
  account: {},
  values: {},
  activeCharacter: {},
  activeGame: {},
  sorted: {},

  // ANCHOR Base Arrays
  characters: [],
  games: [],
  liveGames: [],
  choices: [],
  graveyard: [],

  // ANCHOR Dictionaries

  count: {
    game: 0,
    choice: 0,
    removed: 0
  }
})
