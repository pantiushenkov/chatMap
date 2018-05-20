import {createReducer} from "src/reducer/createReducer";

const initialState = {
  chats: {}
};

const ADD_UNREAD = 'ADD_UNREAD';
const CLEAR_UNREAD = 'CLEAR_UNREAD';

const addUnread = (payload) => ({
  type: ADD_UNREAD,
  payload,
});

const clearUnread = (payload) => ({
  type: CLEAR_UNREAD,
  payload,
});

export const messageActions = {
  clearUnread,
  addUnread,
};

const reducers = {
  [ADD_UNREAD]: (state, {chatName, message}) => {
    const chat = state.chats[chatName];
    const messages = chat ? chat.messages : [];
    return {
      ...state, chats: {
        ...state.chats, [chatName]: [
          ...messages, message
        ]
      },
    }
  },
  [CLEAR_UNREAD]: (state, {chatName}) => ({
    ...state, chats: [...state.chats, {
      [chatName]: []
    }],
  }),
};

export default createReducer(reducers, initialState);
