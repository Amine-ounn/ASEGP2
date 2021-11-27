import React from 'react';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation';
import Register from './Register';
import LoginScreen from './LoginScreen';
import Map from './Map';
import Navigator from './routes/homeStack';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';



const App = () => {
    return (
        <Navigator />
    //    <LoginScreen />
     //   <Register />
    );
};

export default App;

