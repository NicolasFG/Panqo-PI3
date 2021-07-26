import Vue from 'vue';
import Vuex from 'vuex';
import Api from '@/services/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Users: [],
    currentUser: {},
  },
  mutations: {
    SET_USERS(state, users) {
      state.Users = users;
    },
    LOGOUT_USER(state) {
      state.currentUser = {};
      window.localStorage.currentUser = JSON.stringify({});
      window.localStorage.clear();
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
      window.localStorage.currentUser = JSON.stringify(user);
    },
  },
  actions: {
    async GetUsers({ commit }) {
      let response = await Api().get('/');
      console.log(response);
      commit('SET_USERS', response.data);
      if (window.localStorage.currentUser) {
        let user = JSON.parse(window.localStorage.currentUser);
        commit('SET_CURRENT_USER', user);
      }
      return response;
    },
    logoutUser({ commit }) {
      commit('LOGOUT_USER');
    },
    async LoginUser({ commit }, Userinfo) {
      try {
        let response = await Api().post('/auth/login', Userinfo);
        console.log(response);
        let user = response.data.account;
        commit('SET_CURRENT_USER', user);
        return response;
      } catch (error) {
        return error;
      }
    },
    async RegisterUser({ commit }, Userinfo) {
      try {
        console.log(Userinfo);
        let response = await Api().post('/auth/register', Userinfo);
        console.log(response);
        let user = response.data.account;
        commit('SET_CURRENT_USER', user);
        return response;
      } catch (error) {
        return error;
      }
    },
    async addImage(article) {
      try {
        console.log(article);
        let response = await Api().post('/images', article);
        console.log(response);
        // let art = response.data;
        // commit('ADD_ARTICLE', art);
        // return art;
      } catch {
        return { error: 'Hubo un error al subir la imagen' };
      }
    },
  },
});
