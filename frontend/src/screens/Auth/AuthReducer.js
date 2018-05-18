import {createReducer} from "src/reducer/createReducer";
import {post} from 'src/services/Request'
import {AsyncStorage} from "react-native";
import axios from 'src/services/Axios';
import {CREATE_CHAT} from "src/reducer/GlobalConstants";

const initialState = {errors: {}, data: {}};
const LOGIN = 'LOGIN';

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

const SET_DATA = 'SET_DATA';

const setData = (payload) => ({
  type: SET_DATA,
  payload,
});

export const authActions = {
  getMe,
  login,
  register,
  setData,
};

const reducers = {
  [LOGIN]: (state, payload) => ({...state, ...payload}),
  [CREATE_CHAT]: (state, payload) => ({
    ...state,
    data: {...state.data, user: payload.data ? payload.data.user : state.data.user}
  }),
  [SET_DATA]: (state, {ChatEngine, ...payload}) => ({...state, ...payload}),
};

export default createReducer(reducers, initialState);
