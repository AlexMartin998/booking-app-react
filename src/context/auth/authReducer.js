import { types } from '../types/types';

export const authReducer = (state, action) => {
  switch (action.type) {
    case types.startLlogin:
      return { ...state, loading: true, user: null, error: null };

    case types.loginSuccess:
      return { ...state, loading: false, user: action.payload, error: null };

    case types.loginFail:
      return { ...state, loading: false, user: null, error: action.payload };

    case types.logout:
      return { ...state, loading: false, user: null, error: null };

    default:
      return state;
  }
};
