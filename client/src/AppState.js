import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  // ANCHOR Base Variables

  // ANCHOR Base Objects
  user: {},
  account: {},
  values: {},
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
  },
  races: ['Aasimar', 'Arakocra', 'Changeling', 'Dragonborn', 'Dwarf', 'Elf', 'Firbolg', 'Genasi', 'Gnome', 'Goliath', 'Half-Elf', 'Halfling', 'Half-Orc', 'Human', 'Kenku', 'Lizardfolk', 'Minotaur', 'Shifter', 'Tabaxi', 'Tiefling', 'Triton', 'Warforged', 'Yuan-Ti'],
  classes: ['Artificer', 'Barbarian', 'Bard', 'Blood Hunter', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard']
})
