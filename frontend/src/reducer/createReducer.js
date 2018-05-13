export const createReducer = (reducers, initialState) => (
  (state = initialState, action = {}) => {
    const reducer = reducers[action.type];
    return reducer ? reducer(state, action.payload) : state;
  }
);
