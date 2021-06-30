<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      <h4 class="footer-text m-0">
        Made with <i class="fas fa-heart mx-1"></i> by Samwise
      </h4>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
  .footer-text {
  font-size: 1.5rem;
  }
  .fa-heart {
    color: lighten($danger, 10%);
  }
</style>
