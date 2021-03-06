// import '@mdi/font/css/materialdesignicons.css'
import 'jquery'
import 'popper.js'
import 'bootstrap'
// @ts-ignore
import App from './App.vue'
import { createApp } from 'vue'
import { registerGlobalComponents } from './registerGlobalComponents'
import { router } from './router'

const root = createApp(App)
registerGlobalComponents(root)

root
  .use(router)
  .mount('#app')
