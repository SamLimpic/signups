<template>
  <!-- ANCHOR Renders available Games -->
  <div class="col-md-6 col-12 px-md-3 px-md-3 py-md-4 px-4 p-3">
    <div class="bg-light rounded shadow h-100 position-relative">
      <div class="row justify-content-between cover px-md-3 pt-md-3 pb-md-2 px-2 pt-2 pb-0">
        <!-- <div class="icon-row text-left pl-1">
          <span class="text-danger">
            <i class="fas fa-history pr-md-2 pr-1"></i><span class="font-sm">{{ gameProp.length }} Week </span>
          </span>
          <span class="text-success pl-lg-4 pl-3">
            <i class="fas fa-star-half-alt pr-md-2 pr-1"></i><span class="font-sm">{{ gameProp.experience }} </span>
          </span>
          <span class="text-info pl-lg-4 pl-3" v-if="gameProp.masked">
            <i class="fas fa-shield-virus"></i>
          </span>
          <span class="text-danger pl-lg-4 pl-3" v-if="gameProp.outdoor">
            <i class="fas fa-sun"></i>
          </span>
        </div> -->
        <div class="col-12 right text-left py-1 pl-4">
          <h3 class="font-sm m-0">
            [ {{ gameProp.size }} Players ]
          </h3>
          <h4 class="font-xl m-0">
            {{ gameProp.title }}
          </h4>
          <h5 class="font-sm px-md-3 px-1">
            <i>By {{ gameProp.creator.name }}</i>
          </h5>
          <div class="b-line mx-2 mb-2"></div>
          <h6 class="font-md px-md-3 px-1">
            <i>{{ gameProp.description }}</i>
          </h6>
        </div>
      </div>
      <div class="select">
        <button type="button" :id="gameProp.id" class="btn btn-primary p-0" disabled>
          {{ indexProp }}
        </button>
      </div>
      <div class="icons rounded shadow px-2 pt-2 pb-1 text-left">
        <p class="text-primary pl-1 m-0">
          <i class="fas fa-dice-d20 font-md pr-2"></i>
          <span class="font-xs pr-1">Choice {{ indexProp }} </span>
        </p>
        <p class="text-danger pl-1 m-0">
          <i class="fas fa-history font-md pr-2"></i>
          <span class="font-xs pr-1">{{ gameProp.length }} Week</span>
        </p>
        <p class="text-success pl-1 m-0">
          <i class="fas fa-star-half-alt font-md pr-2"></i>
          <span class="font-xs pr-1">{{ gameProp.experience }} Exp</span>
        </p>
        <p class="text-info pl-1 m-0" v-if="gameProp.masked">
          <i class="fas fa-shield-virus font-md pr-2"></i>
          <span class="font-xs pr-1">Masked</span>
        </p>
        <p class="text-warning pl-1 m-0" v-if="gameProp.outdoor">
          <i class="fa fa-sun font-md pr-2"></i>
          <span class="font-xs pr-1">Outdoor</span>
        </p>
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
  right: .5rem;
  top: .5rem;
}
.btn {
  height: 2.5rem;
  width: 2.5rem;
  font-size: 1.25rem;
}
.icons {
  position: absolute;
  font-family: "Aladin", cursive;
  font-weight:500;
  background: lighten(#daccac, 20%);
  top: -1rem;
  right: -1rem;
}
@media (min-width: 0) {
.btn {
  height: 1.75rem;
  width: 1.75rem;
  font-size: 1rem;
}
.cover {
  min-height: 8.25rem;
}
.icons {
  right: -.5rem;
  top: -.5rem;
}
.right {
  padding-right: 7rem;
}
}

@media (min-width: 576px) {
.btn {
  height: 1.75rem;
  width: 1.75rem;
  font-size: 1rem;
}
.cover {
  min-height: 8.25rem;
}
.icons {
  right: -.75rem;
  top: -.75rem;
}
.right {
  padding-right: 7rem;
}
}

@media (min-width: 768px) {
.btn {
  height: 2.25rem;
  width: 2.25rem;
  font-size: 1.25rem;
}
.cover {
  min-height: 9.25rem;
}
.icons {
  right: -.75rem;
  top: -.75rem;
}
.right {
  padding-right: 7.25rem;
}
}

@media (min-width: 992px) {
.btn {
  height: 2.5rem;
  width: 2.5rem;
  font-size: 1.25rem;
}
.cover {
  min-height: 9.5rem;
}
.icons {
  right: -.75rem;
  top: -.75rem;
}
.right {
  padding-right: 7.75rem;
}
}

@media (min-width: 1200px) {
.btn {
  height: 2.5rem;
  width: 2.5rem;
  font-size: 1.5rem;
}
.cover {
  min-height: 11.5rem;
}
.icons {
  right: -.75rem;
  top: -.75rem;
}
.right {
  padding-right: 8.25rem;
}
}
</style>
