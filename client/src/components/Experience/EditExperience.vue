<template>
  <form class="row justify-content-around bg-light rounded shadow p-3">
    <div class="col-md-4 col-6">
      <div class="form-group font-lg">
        <label class="m-0">Weekly Minimum</label>
        <input type="number" class="form-control font-lg" v-model="state.values.expMin">
      </div>
    </div>
    <div class="col-md-4 col-6">
      <div class="form-group font-lg">
        <label class="m-0">Weekly Maximum</label>
        <input type="number" class="form-control font-lg" v-model="state.values.expMax">
      </div>
    </div>
    <div class="col-md-4 col-6">
      <div class="form-group font-lg">
        <label class="m-0">Character Base</label>
        <input type="number" class="form-control font-lg" v-model="state.values.expBase">
      </div>
    </div>
    <div class="col-md-4 col-6 text-md-center mt-auto mb-3 pt-md-3">
      <h2 class="font-lg mb-1">
        Updated: <i>{{ state.values.updatedAt.substring(5, 10) }}</i>
      </h2>
      <button type="button" class="btn btn-success w-100 font-lg" @click="confirm">
        Confirm
      </button>
    </div>
  </form>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../../AppState'
import { valuesService } from '../../services/ValuesService'
import Notification from '../../utils/Notification'

export default {
  name: 'EditExperience',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      values: computed(() => AppState.values)
    })
    onMounted(async() => {

    })
    return {
      state,
      async confirm() {
        try {
          if (await Notification.confirmAction('Confirm your updates', 'These values will alter the base experience amounts for Game and Character creation', 'info', 'Confirm')) {
            await valuesService.editValues(state.values.id, state.values)
            Notification.toast('Your updates have been saved!', 'success')
          } else {
            Notification.toast("No problem, we'll keep the values as they are!", 'info')
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

@media (min-width: 0) {

}

@media (min-width: 576px) {

}

@media (min-width: 768px) {

}

@media (min-width: 992px) {

}

@media (min-width: 1200px) {

}

</style>
