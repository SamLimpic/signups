import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/account/:id',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/games',
    name: 'Games',
    component: loadPage('GamesPage'),
    beforeEnter: authGuard
  },
  {
    path: '/admin/:id',
    name: 'Admin',
    component: loadPage('AdminPage')
  },
  {
    path: '/dm/:id',
    name: 'DM',
    component: loadPage('DMPage')
  },
  {
    path: '/access-test',
    name: 'AccessTest',
    component: loadPage('AccessTestPage')
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
