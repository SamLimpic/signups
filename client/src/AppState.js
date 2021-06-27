import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  // ANCHOR Base Objects
  user: {},
  account: {},
  activeCharacter: {},
  activeGame: {},

  // ANCHOR Base Arrays
  characters: [],
  games: [],
  options: [],
  choices: [],

  // ANCHOR Dictionaries
  count: {
    choice: 0
  }
})
