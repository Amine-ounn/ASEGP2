import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation';
import Register from '../Register';
import LoginScreen from '../LoginScreen';
import Map from '../Map';



const screens = {
    
    LoginScreen: {
        screen: LoginScreen
    },
    Register : {
        screen: Register
    },
    Map: {
        screen: Map
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);