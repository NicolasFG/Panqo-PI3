import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Registrar from '../views/Registrar.vue';
import RecuperarContra from '../views/RecuperarContra.vue';
import Inicio from '../views/Inicio.vue';
import Analizar from '../views/Analizar.vue';
import Palta from '../views/Analisis_Palta.vue';
import Naranja from '../views/Analisis_Naranja.vue';
import Manzana from '../views/Analisis_Manzana.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/registrar',
    name: 'Registrar',
    component: Registrar,
  },
  {
    path: '/recuperarContra',
    name: 'RecuperarContra',
    component: RecuperarContra,
  },
  {
    path: '/analizar',
    name: 'Analizar',
    component: Analizar,
  },
  {
    path: '/inicio',
    name: 'Inicio',
    component: Inicio,
  },
  {
    path: '/analizar_palta',
    name: 'Palta',
    component: Palta,
  },
  {
    path: '/analizar_naranja',
    name: 'Naranja',
    component: Naranja,
  },
  {
    path: '/analizar_manzana',
    name: 'Manzana',
    component: Manzana,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
