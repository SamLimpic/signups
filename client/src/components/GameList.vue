<template>
  <!-- ANCHOR Renders available Games -->
  <div class="col-md-6 col-12 p-2">
    <div class="row justify-content-between position-relative bg-light rounded shadow m-2 p-sm-2 p-1">
      <div class="col-lg-9 col-md-8 col-sm-10 col-9 text-left cover pt-2">
        <h3 class="font-sm p-0 m-0">
          [ {{ gameProp.size }} Players ]
        </h3>
        <h4 class="font-xl m-0">
          <u>{{ gameProp.title }}</u>
        </h4>
        <h5 class="font-sm">
          <i>By {{ gameProp.creator.name }}</i>
        </h5>
        <h6 class="font-md">
          {{ gameProp.description }}
        </h6>
      </div>
      <div class="icons text-right">
        <p class="p-0 m-0" v-if="gameProp.live">
          <span class="date-text font-sm">{{ gameProp.date.substring(5, 10) }} </span><i class="far fa-calendar-check font-xl text-primary pl-2"></i>
        </p>
        <p class="p-0 m-0" v-else>
          <span class="past-date-text font-sm">{{ gameProp.date.substring(5, 10) }} </span><i class="far fa-calendar-times font-xl text-secondary pl-2"></i>
        </p>
        <p class="p-0 m-0">
          <span class="week-text font-sm">{{ gameProp.length }} Week</span><i class="fas fa-history font-xl text-danger pl-2"></i>
        </p>
        <p class="p-0 m-0">
          <span class="exp-text font-sm">{{ gameProp.experience }} EXP</span><i class="fas fa-star-half-alt font-xl text-success pl-2"></i>
        </p>
        <p class="p-0 m-0" v-if="gameProp.masked">
          <span class="virus-text font-sm">Masked</span><i class="fas fa-shield-virus font-xl text-info  pl-2"></i>
        </p>
        <p class="p-0 m-0" v-if="gameProp.outdoor">
          <span class="sun-text font-sm">Outdoor</span><i class="fa fa-sun font-xl text-warning pl-2"></i>
        </p>
      </div>
      <button type="button" class="select btn btn-primary font-md py-0" disabled v-if="liveProp">
        Choice {{ indexProp }}
      </button>
      <button type="button" :id="gameProp.id" class="select btn btn-primary font-md py-0" @click="select(state.choice, gameProp)" v-else>
        Select
      </button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'

export default {
  name: 'GameList',
  props: {
    gameProp: {
      type: Object,
      required: true
    },
    indexProp: {
      type: Number,
      default: 0
    },
    liveProp: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      choice: computed(() => AppState.count.choice)
    })
    onMounted(async() => {

    })
    return {
      state,
      select(num, game) {
        try {
          AppState.choices.push(game)
          document.getElementById(`${game.id}`).innerText = `Choice ${num + 1}`
          document.getElementById(`${game.id}`).disabled = true
          AppState.count.choice++
          Notification.toast(`${game.title} is your #${num + 1} choice!`, 'success')
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
.icons {
  position: absolute;
  right: 1rem;
  top: .75rem;
  font-family: "Aladin", cursive;
  font-weight:500;
}
.virus-text {
  transition: all .5s ease-in-out;
  opacity: .25;
}
.virus-text:hover {
  color: var(--info);
  opacity: 1;
}
.sun-text {
  transition: all .5s ease-in-out;
  opacity: .25;
}
.sun-text:hover {
  color: var(--warning);
  opacity: 1;
}
.exp-text {
  transition: all .5s ease-in-out;
  opacity: .25;
}
.exp-text:hover {
  color: var(--success);
  opacity: 1;
}
.week-text {
  transition: all .5s ease-in-out;
  opacity: .25;
}
.date-text:hover {
  color: var(--primary);
  opacity: 1;
}
.date-text {
  transition: all .5s ease-in-out;
  opacity: .25;
}
.past-date-text:hover {
  color: var(--secondary);
  opacity: 1;
}
.past-date-text {
  transition: all .5s ease-in-out;
  opacity: .25;
}
.week-text:hover {
  color: var(--danger);
  opacity: 1;
}
.select {
  position: absolute;
  bottom: .75rem;
  right: .75rem;
}
.dropdown-menu {
    min-width: 3rem;
}
@media (min-width: 0) {
p {
  height: 2rem;
}
.cover {
  min-height: 13rem;
}
}

@media (min-width: 576px) {
p {
  height: 2.25rem;
}
.cover {
  min-height: 14rem;
}
}

@media (min-width: 768px) {
p {
  height: 2.5rem;
}
.cover {
  min-height: 15.5rem;
}
}

@media (min-width: 992px) {
p {
  height: 2.75rem;
}
.cover {
  min-height: 17rem;
}
}

@media (min-width: 1200px) {
p {
  height: 3rem;
}
.cover {
  min-height: 18.75rem;
}
}

</style>
