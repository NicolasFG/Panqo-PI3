import Vue from 'vue';
import Vuex from 'vuex';
import Api from '@/services/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Users: [],
    Imges: [],
    currentUser: {},
  },
  mutations: {
    SET_USERS(state, users) {
      state.Users = users;
    },
    LOGOUT_USER(state) {
      state.currentUser = {};
      window.localStorage.currentUser = JSON.stringify({});
      window.localStorage.token = JSON.stringify({});
      window.localStorage.clear();
      // delete axios.defaults.headers.common['Authorization'];
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
        window.localStorage.token = JSON.stringify(response.data.token);
        commit('SET_CURRENT_USER', response.data.account);
        return response;
      } catch (error) {
        return error;
      }
    },
    async RegisterUser({ commit }, Userinfo) {
      try {
        console.log(Userinfo);
        let response = await Api().post('/auth/register', Userinfo);
        window.localStorage.token = JSON.stringify(response.data.token);
        commit('SET_CURRENT_USER', response.data.account);
        return response;
      } catch (error) {
        return error;
      }
    },
    async addImage({ commit }, param) {
      try {
        const { image, id } = param;
        const formData = new FormData();
        formData.append('image', image);
        formData.append('fruit_id', id);
        const token = JSON.parse(localStorage.getItem('token'));
        let response = await Api().post('/analysis', formData, {
          headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: token,
          },
        });
        console.log(response);
        commit();
      } catch {
        return { error: 'Hubo un error al subir la imagen' };
      }
    },
  },
});
