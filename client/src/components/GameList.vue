<template>
  <!-- ANCHOR Renders available Games -->
  <div class="col-md-6 col-12 bg-light rounded shadow cover p-3">
    <div class="row justify-content-between position-relative pt-1 pl-1">
      <div class="col-lg-9 col-md-8 col-sm-10 col-9 text-left">
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
      <div class="icon text-right">
        <p class="p-0 m-0">
          <span class="exp-text font-md">{{ gameProp.experience }} EXP</span><i class="fas fa-star-half-alt font-xl text-success pl-2"></i>
        </p>
        <p class="p-0 m-0">
          <span class="week-text font-md">{{ gameProp.length }} Week</span><i class="fas fa-history font-xl text-danger pl-2"></i>
        </p>
        <p class="p-0 m-0" v-if="gameProp.masked">
          <span class="virus-text font-md">Masked</span><i class="fas fa-virus font-xl text-info  pl-2"></i>
        </p>
        <p class="p-0 m-0" v-if="gameProp.outdoor">
          <span class="sun-text font-md">Outdoor</span><i class="fas fa-sun font-xl text-warning pl-2"></i>
        </p>
      </div>
      <div class="dropdown dropup">
        <button :id="gameProp.id"
                class="btn btn-primary font-sm dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
        >
          Order
        </button>
        <div class="dropdown-menu dropdown-menu-right m-0 p-0 mb-1" aria-labelledby="dropdownMenuButton">
          <Dropdown v-for="d in state.options" :key="d" :drop-prop="d" :game-prop="gameProp" />
        </div>
      </div>
    </div>
    <!-- <div class="position-relative pb-xl-3 pb-md-2 pb-sm-1">
      <p class="exp p-0 m-0">
        <i class="fas fa-star-half-alt font-xl text-success"></i><span class="exp-text font-md pl-2">{{ gameProp.experience }} EXP</span>
      </p>
      <p class="week p-0 m-0">
        <span class="week-text font-md pr-2">{{ gameProp.length }} Week</span><i class="fas fa-history font-xl text-danger"></i>
      </p>
    </div>
    <div class="mt-4 mb-3">
      <h3 class="font-xl m-0">
        <u>{{ gameProp.title }}</u>
      </h3>
      <h4 class="font-sm">
        <i>By {{ gameProp.creator.name }}</i>
      </h4>
      <h5 class="font-md">
        {{ gameProp.description }}
      </h5>
    </div>
    <div class="position-relative pt-xl-3 pt-md-2 pt-sm-1">
      <p class="virus p-0 m-0" v-if="gameProp.masked">
        <i class="fas fa-virus font-xl text-info"></i><span class="virus-text font-md pl-2">Masked</span>
      </p>
      <p class="sun p-0 m-0" v-if="gameProp.outdoor">
        <span class="sun-text font-md pr-2">Outdoors</span><i class="fas fa-sun font-xl text-warning"></i>
      </p>
    </div> -->
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
// import { gamesService } from '../services/GamesService'
// import Notification from '../utils/Notification'

export default {
  name: 'GameList',
  props: {
    gameProp: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      options: computed(() => AppState.options)
    })
    onMounted(async() => {

    })
    return {
      state
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.icon {
  position: absolute;
  right: .75rem;
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
.week-text:hover {
  color: var(--danger);
  opacity: 1;
}
.dropdown {
  position: absolute;
  bottom: 0rem;
  right: 1rem;
}
.dropdown-menu {
    min-width: 3rem;
}
@media (min-width: 0) {
p {
  height: 1.75rem;
}
.icon {
  top: -2.25rem;
}
.cover {
  min-height: 8rem;
}
}

@media (min-width: 576px) {
p {
  height: 2rem;
}
.icon {
  top: -2.5rem;
}
.cover {
  min-height: 9rem;
}
}

@media (min-width: 768px) {
p {
  height: 2.25rem;
}
.icon {
  top: -2.75rem;
}
.cover {
  min-height: 10rem;
}
}

@media (min-width: 992px) {
p {
  height: 2.5rem;
}
.icon {
  top: -3rem;
}
.cover {
  min-height: 11rem;
}
}

@media (min-width: 1200px) {
p {
  height: 2.75rem;
}
.icon {
  top: -3.25rem;
}
.cover {
  min-height: 12rem;
}
}

</style>
