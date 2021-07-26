import axios from 'axios';
export default () => {
  return axios.create({
    baseURL: 'https://panqo-api.herokuapp.com/api',
    withCredentials: false,
  });
};
