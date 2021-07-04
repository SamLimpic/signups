<template>
  <form class="row justify-content-around align-items-center bg-light rounded shadow p-md-3 p-2">
    <div class="col-12 text-center">
      <h2 class="font-md text-muted m-0 mt-2">
        Last Updated: <i>{{ state.values.updatedAt.substring(5, 10) }}</i>
      </h2>
    </div>
    <div class="col-md-5 col-sm-6 col-12 text-center my-md-3 mb-md-4 my-2">
      <div class="btn-group w-100">
        <button id="race"
                class="btn btn-primary font-xl w-100"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
        >
          Total Races
        </button>
        <button type="button" class="btn btn-sm btn-success rounded-right font-xl" @click="add('Race')">
          <i class="fa fa-plus py-sm-2 px-sm-1 py-1"></i>
        </button>
        <div class="dropdown-menu shadow m-0 p-0 mt-md-2 mt-1" aria-labelledby="dropdownMenuButton">
          <CharacterDrop v-for="(r, index) in state.values.race"
                         :key="index"
                         :drop-prop="r"
                         type-prop="Race"
                         :live-prop="state.account.admin"
                         :left-prop="state.account.admin"
          />
        </div>
      </div>
    </div>
    <div class="col-md-5 col-sm-6 col-12 text-center my-md-3 mb-md-4 my-2 mb-sm-2 mb-3">
      <div class="btn-group w-100">
        <button id="class"
                class="btn btn-primary font-xl w-100"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
        >
          Total Classes
        </button>
        <button type="button" class="btn btn-sm btn-success rounded-right font-xl" @click="add('Class')">
          <i class="fa fa-plus py-sm-2 px-sm-1 py-1"></i>
        </button>
        <div class="dropdown-menu shadow m-0 p-0 mt-md-2 mt-1" aria-labelledby="dropdownMenuButton">
          <CharacterDrop v-for="(c, index) in state.values.class" :key="index" :drop-prop="c" type-prop="Class" :live-prop="state.account.admin" />
        </div>
      </div>
    </div>
    <div class="col-md-3 col-6">
      <div class="form-group font-lg">
        <label class="m-0">Weekly Min</label>
        <input type="number" class="form-control font-lg" v-model="state.values.min">
      </div>
    </div>
    <div class="col-md-3 col-6">
      <div class="form-group font-lg">
        <label class="m-0">Weekly Max</label>
        <input type="number" class="form-control font-lg" v-model="state.values.max">
      </div>
    </div>
    <div class="col-md-3 col-6">
      <div class="form-group font-lg">
        <label class="m-0">Exp Interval</label>
        <input type="number" class="form-control font-lg" v-model="state.values.interval">
      </div>
    </div>
    <div class="col-md-3 col-6 mr-auto">
      <div class="form-group font-lg">
        <label class="m-0">Exp Base</label>
        <input type="number" class="form-control font-lg" v-model="state.values.base">
      </div>
    </div>
    <div class="col-12 text-center px-0 my-lg-3 my-md-2 mt-sm-0 mb-2">
      <button type="button" class="btn btn-success font-xl py-md-2 px-4" @click="confirm">
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
  name: 'EditValues',
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
      },
      async add(type) {
        try {
          const current = AppState.values[type.toLowerCase()].length
          await Notification.values(type)
          const newType = AppState.values[type.toLowerCase()][AppState.values[type.toLowerCase()].length - 1]
          AppState.values[type.toLowerCase()] = AppState.values[type.toLowerCase()].sort()
          if (AppState.values[type.toLowerCase()].length > current) {
            Notification.toast(`You've added ${newType} as an available ${type}!`, 'success')
            await valuesService.editValues(state.values.id, state.values)
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
.dropdown-menu {
  height: auto;
  overflow-y: scroll;
  min-width: 90%;
}
.btn-success {
  border-color: darken(#4f6031, 10%);
  border-width: 3px;
  border-style: solid;
}

@media (min-width: 0) {
.dropdown-menu {
  max-height: 27.5vh;
}
}

@media (min-width: 576px) {
.dropdown-menu {
  max-height: 30vh;
}
}

@media (min-width: 768px) {
.dropdown-menu {
  max-height: 35vh;
}
}

@media (min-width: 992px) {
.dropdown-menu {
  max-height: 40vh;
}
}

@media (min-width: 1200px) {
.dropdown-menu {
  max-height: 45vh;
}
}

</style>
