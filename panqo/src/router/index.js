import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Registrar from '../views/Registrar.vue'
import RecuperarContra from '../views/RecuperarContra.vue'
import Inicio from '../views/Inicio.vue'
import Analizar from '../views/Analizar.vue'

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
  {
    path: '/analizar',
    name: 'Analizar',
    component: Analizar
    },
  {
    path: '/inicio',
    name: 'Inicio',
    component: Inicio
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
