import {createReducer} from "src/reducer/createReducer";
import {post} from 'src/services/Request'
import {AsyncStorage} from "react-native";
import axios from 'src/services/Axios';

const initialState = {errors: {}, data: {}};
const LOGIN = 'login';

const auth = (method) => (payload) => async (dispatch) => {
  const response = await post(method, payload);

  dispatch({
    type: LOGIN,
    payload: response,
  });

  if (method !== 'me') {
    axios.defaults.headers.common['authorization'] = response.data.token;
    AsyncStorage.setItem('token', response.data.token);
  }
};

const login = auth('login');
const register = auth('register');

const getMe = (token) => {
  axios.defaults.headers.common['authorization'] = token;
  return auth('me')({token});
};

export const authActions = {
  getMe,
  login,
  register,
};

const reducers = {
  [LOGIN]: (state, payload) => ({...state, ...payload})
};

export default createReducer(reducers, initialState);
