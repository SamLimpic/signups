<template>
  <a class="dropdown-item font-sm bg-secondary text-light text-center py-1 pl-3 pr-3" @click="select(dropProp, typeProp)">{{ dropProp }}</a>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'

export default {
  name: 'CharacterDrop',
  props: {
    dropProp: {
      type: String,
      required: true
    },
    typeProp: {
      type: String,
      required: true
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
          document.getElementById(`${type}`).innerText = choice
          document.getElementById(`${type}`).disabled = true

          Notification.toast(`You've chosen ${choice} as your character's ${type}!`, 'success')
        } catch (error) {
          Notification.toast('Error: ', +error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
