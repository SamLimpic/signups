<template>
  <option>
    {{ expProp }}
  </option>
</template>

<script>
import { onMounted, reactive } from 'vue'

export default {
  name: 'ExperienceDrop',
  props: {
    expProp: {
      type: Number,
      required: true
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

</style>
