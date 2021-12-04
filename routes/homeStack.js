import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Register from '../app/screens/Register';
import LoginScreen from '../app/screens/LoginScreen';
import Map from '../app/screens/Map';

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <NavigationContainer>
      <HomeStack.Navigator initialRouteName="Welcome">
        <HomeStack.Screen
          name="Welcome"
          component={LoginScreen}
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
