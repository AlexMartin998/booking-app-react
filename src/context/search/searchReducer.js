import { types } from '../types/types';

const INITIAL_STATE = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const searchReducer = (state, action) => {
  switch (action.type) {
    case types.newSearch:
      return { ...state, ...action.payload };

    case types.resetSearch:
      return { ...state, ...INITIAL_STATE };

    default:
      return state;
  }
};
