import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation';
import Register from '../screens/Register';
import LoginScreen from '../screens/LoginScreen';
import Map from '../screens/Map';



const screens = {
    
    Welcome: {
        screen: LoginScreen
    },
    Register: {
        screen: Register
    },
    Map: {
        screen: Map
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);