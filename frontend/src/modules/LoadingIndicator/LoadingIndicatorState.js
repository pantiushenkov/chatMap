import {createReducer} from "src/reducer/createReducer";

const SPINNER = 'SPINNER';

export const initialState = {};

export const show = payload => ({SPINNER, payload});

export const loadingIndicatorActions = {
  show,
};

const reducer = {
  // 'login': (state) => ({...state, login: true}),
};

export default createReducer(reducer, initialState);

