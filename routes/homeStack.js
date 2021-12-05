import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Register from '../app/screens/Register';
import Login from '../app/screens/Login';
import Map from '../app/screens/Map';

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <NavigationContainer>
      <HomeStack.Navigator initialRouteName="Login">
        <HomeStack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="Map"
          component={Map}
          options={{headerShown: false}}
        />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default HomeStackNavigator;
