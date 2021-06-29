<template>
  <a class="dropdown-item font-sm bg-secondary text-light text-center py-1 pl-3 pr-3" @click="select(dropProp, gameProp)">Choice {{ dropProp + 1 }}</a>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'

export default {
  name: 'GameDrop',
  props: {
    dropProp: {
      type: Number,
      required: true
    },
    gameProp: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      options: computed(() => AppState.options)
    })
    onMounted(async() => {

    })
    return {
      state,
      select(num, game) {
        try {
          AppState.choices.push(game)
          AppState.options = AppState.options.filter(o => o !== num)
          document.getElementById(`${game.id}`).innerText = `Choice ${num + 1}`
          document.getElementById(`${game.id}`).disabled = true
          AppState.count.choice++
          Notification.toast(`${game.title} is your #${num + 1} choice!`, 'success')
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
