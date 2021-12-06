import React, {useEffect, useState} from 'react';
import AuthContext from '../contexts/AuthContext';
import api, {setAuthToken} from '../config/axiosConfig';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [splashScreen, setSplashScreen] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setSplashScreen(true);
    retrieveToken();

    setTimeout(() => {
      setSplashScreen(false);
    }, 3000);
  }, []);

  const retrieveToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@token');
      if (token !== null) {
        // We have data!!
        setAuthToken(token);

        setIsAuthenticated(true);
      }
    } catch (e) {
      // error reading value or not authorized
      setIsAuthenticated(false);
    }
  };

  const onLogin = async ({email, password}) => {
    setIsLoading(true);

    const response = await api.post('/login', {email, password});

    if (response.data) {
      // set header authorization
      setAuthToken(response.data.token);

      // save token to local storage
      try {
        await AsyncStorage.setItem('@token', response.data.token);
      } catch (e) {
        // saving error
      }

      // set user
      setUser(response.data.user);

      // set user is authenticated
      setIsAuthenticated(true);

      setIsLoading(false);
    } else {
      setIsLoading(false);
      setError(response.data.error);
    }
  };

  const onLogout = () => {
    setIsAuthenticated(false);
    setAuthToken(null);
    setUser(null);
  };

  const onRegister = async ({name, email, password}) => {
    setIsLoading(true);
    try {
      const response = await api.post('/login', {email, password});

      if (response.status === 200) {
        return true;
      }
      setIsLoading(false);
    } catch (e) {
      console.log('reaches here', e);
      setIsLoading(false);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        error,
        splashScreen,
        login: onLogin,
        logout: onLogout,
        register: onRegister,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
