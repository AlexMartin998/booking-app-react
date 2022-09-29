import { useEffect } from 'react';
import { useReducer } from 'react';
import { types } from '../types/types';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  error: null,
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(authState.user));
  }, [authState.user]);

  const startLogin = () => {
    dispatch({ type: types.startLlogin });
  };

  const loginFail = error => {
    dispatch({ type: types.loginFail, payload: error });
  };

  const loginSuccess = user => {
    dispatch({ type: types.loginSuccess, payload: user });

    console.log(authState);
  };

  const logout = () => {
    dispatch({
      type: types.logout,
    });
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{ ...authState, startLogin, loginFail, loginSuccess, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
