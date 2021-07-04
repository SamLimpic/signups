<template>
  <a class="dropdown-item font-sm bg-info text-light text-center hoverable py-1 px-lg-4 px-3" @click="change(charProp)" v-if="charProp">{{ charProp.name }}</a>
  <a :class="{'text-center bg-info px-lg-4 px-3': !typeProp, 'text-left bg-secondary px-md-3 px-2': typeProp}" class="dropdown-item font-lg text-light py-1" disabled v-else-if="liveProp">
    <i class="fas fa-skull text-shadow font-xl clickable mr-md-3 mr-2 mt-md-2 mt-1" v-if="typeProp" @click="remove(dropProp, typeProp)"></i>
    {{ dropProp }}</a>
  <a class="dropdown-item font-sm bg-secondary text-light text-center hoverable py-1 px-lg-4 px-3" @click="select(dropProp, typeProp)" v-else>{{ dropProp }}</a>
  <div class="dropdown-divider p-0 m-0"></div>
</template>

<script>
/* eslint-disable vue/require-default-prop */
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../../AppState'
import Notification from '../../utils/Notification'
import { valuesService } from '../../services/ValuesService'

export default {
  name: 'CharacterDrop',
  props: {
    charProp: {
      type: Object,
      required: false
    },
    dropProp: {
      type: String,
      required: false
    },
    typeProp: {
      type: String,
      required: false
    },
    liveProp: {
      type: Boolean,
      default: false
    },
    leftProp: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const state = reactive({
      values: computed(() => AppState.values)
    })
    onMounted(async() => {

    })
    return {
      state,
      select(choice, type) {
        try {
          AppState.activeCharacter[type.toLowerCase()] = choice
          document.getElementById(type.toLowerCase()).innerText = choice
          document.getElementById(type.toLowerCase()).disabled = true
          Notification.toast(`You've chosen ${choice} as your character's ${type}!`, 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      change(character) {
        try {
          Notification.toast(`${character} will participate this week`, 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async remove(name, type) {
        try {
          if (await Notification.confirmAction(`Do you want to remove ${name} as an available ${type}`, 'This will make them unavailable to new characters, but existing ones will remain active', 'warning', 'Confirm')) {
            AppState.values[type.toLowerCase()] = AppState.values[type.toLowerCase()].filter(t => t !== name)
            valuesService.editValues(state.values.id, state.values)
            Notification.toast(`${name} is no longer an available ${type}`, 'success')
          } else {
            Notification.toast(`No worries, we'll keep ${name} as an available ${type}`, 'info')
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
.clickable {
  cursor: pointer;
}
.fa-skull {
  transition: all .3s ease-in-out;
  color: var(--light)
}
.fa-skull:hover {
  color: var(--danger)
}
</style>
