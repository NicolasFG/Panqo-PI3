import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Registrar from '../views/Registrar.vue'
import RecuperarContra from '../views/RecuperarContra.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
  path: '/login',
  name: 'Login',
  component: Login
  },
  {
    path: '/registrar',
    name: 'Registrar',
    component: Registrar
  },
  {
    path: '/recuperarContra',
    name: 'RecuperarContra',
    component: RecuperarContra
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
