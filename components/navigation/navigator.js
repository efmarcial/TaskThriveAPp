import React, {useContext} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import { Context } from "../globalContext/globalContext";

import Landing from "../screens/landing";
import Login from "../screens/login";
import Home from "../screens/Home";


const Stack = createStackNavigator();

function Navigator(props) {

    const globalContext = useContext(Context);
    const {isLoggedIn} = globalContext;

    return (
        <Stack.Navigator initialRouteName="Landing">
        {(!isLoggedIn)?
            <>
            <Stack.Screen name="Landing" component={Landing} options={{headerShown: false}} />
            <Stack.Screen name="Login" component={Login} options={{headerShadow: false}}/>
            </>
            :
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        }
        </Stack.Navigator>
    )
}

export default Navigator;