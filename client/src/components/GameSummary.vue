<template>
  <!-- ANCHOR Renders available Games -->
  <div class="col-lg-2 col-md-4 col-sm-6 p-lg-2 px-4 py-2">
    <div class="row justify-content-between position-relative bg-light rounded shadow h-100 p-sm-2 p-1">
      <div class="col-12 text-left cover pt-2">
        <p class="p-0 m-0 pb-2">
          <i class="far fa-calendar-check font-xl text-primary pr-2"></i><span class="date-text font-sm">{{ gameProp.date.substring(5, 10) }} </span>
        </p>
        <h4 class="font-xl m-0">
          <u>{{ gameProp.title }}</u>
        </h4>
        <h5 class="font-md">
          <i>By {{ gameProp.creator.name }}</i>
        </h5>
      </div>
      <div class="select">
        <button type="button" :id="gameProp.id" class="btn btn-primary p-0" disabled>
          {{ indexProp }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
export default {
  name: 'GameSummary',
  props: {
    gameProp: {
      type: Object,
      required: true
    },
    indexProp: {
      type: Number,
      default: 0
    }
  },
  setup() {
    const state = reactive({
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
.select {
  position: absolute;
  right: .75rem;
  top: .75rem;
}
.btn {
  height: 2.5rem;
  width: 2.5rem;
  font-size: 1.25rem;
}
.date-text:hover {
  color: var(--primary);
  opacity: 1;
}
.date-text {
  transition: all .5s ease-in-out;
  opacity: .25;
}
@media (min-width: 0) {
.btn {
  height: 1.75rem;
  width: 1.75rem;
  font-size: 1rem;
}
}

@media (min-width: 576px) {
.btn {
  height: 2rem;
  width: 2rem;
  font-size: 1rem;
}
}

@media (min-width: 768px) {
.btn {
  height: 2.25rem;
  width: 2.25rem;
  font-size: 1.25rem;
}
}

@media (min-width: 992px) {
.btn {
  height: 2.5rem;
  width: 2.5rem;
  font-size: 1.25rem;
}
}

@media (min-width: 1200px) {
.btn {
  height: 2.5rem;
  width: 2.5rem;
  font-size: 1.5rem;
}
}
</style>
