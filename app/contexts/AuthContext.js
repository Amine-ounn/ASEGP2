import React from 'react';

export default React.createContext({
  isAuthenticated: false,
  isLoading: false,
  user: {},
  error: null,
  splashScreen: false,
  login: () => new Promise(),
  logout: () => new Promise(),
  register: () => new Promise(),
});
