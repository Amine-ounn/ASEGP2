import React, {useEffect, useState} from 'react';
import AuthContext from '../contexts/AuthContext';
import api, {setAuthToken} from '../config/axiosConfig';
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

    return await api
      .post('login/', {email, password})
      .then(async res => {
        setUser({email: res.data.email, name: res.data.name});
        setAuthToken(res.data.token);
        await AsyncStorage.setItem('@token', res.data.token);
        setIsAuthenticated(true);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const onLogout = () => {
    setIsAuthenticated(false);
    setAuthToken(null);
    setUser(null);
  };

  const onRegister = async ({name, email, password}) => {
    setIsLoading(true);

    return await api
      .post('register/', JSON.stringify({name, email, password}))
      .then(response => {
        if (response.status === 200) {
          return true;
        }
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
        return false;
      });
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
