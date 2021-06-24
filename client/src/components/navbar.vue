<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <router-link class="navbar-brand d-flex" :to="{ name: 'AccessTest' }">
      <div class="align-items-center mr-auto">
        <h1 class="d-md-block d-none text-light m-0 py-1">
          <i class="fas fa-dragon text-warning mr-3"></i> The Dragon's Den
        </h1>
        <h1 class="d-md-none d-block m-0 py-1">
          <i class="fas fa-dragon text-warning mr-3"></i>
        </h1>
      </div>
    </router-link>
    <div class="navbar-collapse" id="navbarText">
      <span class="navbar-text ml-auto">
        <button
          class="btn btn-outline-light text-uppercase"
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login
        </button>

        <div class="dropdown" v-else>
          <div
            class="dropdown-toggle"
            @click="state.dropOpen = !state.dropOpen"
          >
            <img
              :src="user.picture"
              alt="user photo"
              height="40"
              class="rounded"
            />
            <span class="mx-3 text-light">{{ account.name }}</span>
          </div>
          <div
            class="dropdown-menu p-0 list-group w-100"
            :class="{ show: state.dropOpen }"
            @click="state.dropOpen = false"
          >
            <router-link :to="{ name: 'Admin' }">
              <div class="list-group-item list-group-item-action hoverable" v-if="account.admin">
                Admin
              </div>
            </router-link>
            <router-link :to="{ name: 'DM' }">
              <div class="list-group-item list-group-item-action hoverable" v-if="account.dm">
                DM
              </div>
            </router-link>
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item list-group-item-action hoverable">
                Account
              </div>
            </router-link>
            <div
              class="list-group-item list-group-item-action hoverable"
              @click="logout"
            >
              Logout
            </div>
          </div>
        </div>
      </span>
    </div>
  </nav>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
export default {
  name: 'Navbar',
  setup() {
    const state = reactive({
      dropOpen: false
    })
    return {
      state,
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--primary);
}
</style>
