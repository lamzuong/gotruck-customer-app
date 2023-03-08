import AuthReducer from './AuthReducer';

import React, { createContext, useReducer } from 'react';
import { INITIAL_STATE } from './AuthReducer';

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        locationNow: state.locationNow,
        listOrder: state.listOrder,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
