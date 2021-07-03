<template>
  <a class="dropdown-item font-sm bg-info text-light text-center hoverable py-1 px-lg-4 px-3" @click="change(charProp)" v-if="charProp">{{ charProp.name }}</a>
  <a class="dropdown-item font-sm bg-info text-light text-center py-1 px-lg-4 px-3" disabled v-else-if="liveProp">{{ dropProp }}</a>
  <a class="dropdown-item font-sm bg-secondary text-light text-center hoverable py-1 px-lg-4 px-3" @click="select(dropProp, typeProp)" v-else>{{ dropProp }}</a>
  <div class="dropdown-divider p-0 m-0"></div>
</template>

<script>
/* eslint-disable vue/require-default-prop */
import { onMounted, reactive } from 'vue'
import { AppState } from '../../AppState'
import Notification from '../../utils/Notification'

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
    }
  },
  setup() {
    const state = reactive({
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
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
