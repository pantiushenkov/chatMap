import {createReducer} from "src/reducer/createReducer";
import {post} from 'src/services/Request'

const initialState = {
  data: {
    chat: [],
    user: []
  }
};

const SEARCH = 'SEARCH';
const CLEAR = 'CLEAR';

const search = payload => async (dispatch) => {
  const response = await post('search', payload);

  dispatch({
    type: SEARCH,
    payload: response,
  });
};
const clear = () => {
  return {
    type: CLEAR,
  };
};

export const searchActions = {
  search,
  clear,
};

const reducers = {
  [SEARCH]: (state, payload) => ({...state, ...payload}),
  [CLEAR]: () => (initialState),
};

export default createReducer(reducers, initialState);
