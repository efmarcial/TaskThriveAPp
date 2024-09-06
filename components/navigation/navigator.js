import React, {useContext, useEffect, useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import { Context } from "../globalContext/globalContext";

import Landing from "../screens/landing";
import Login from "../screens/login";
import Home from "../screens/Home";
import Register from "../screens/register";
import StartupScreen from "../screens/startscreen";
import Profile from "../screens/Profile";

const Stack = createStackNavigator();

function Navigator(props) {

    const globalContext = useContext(Context);
    const {isLoggedIn, userObj} = globalContext;


    //State to track if the APIs have been loaded
    const [isLoading, setIsLoading]  = useState(true);

    const handleApiLoadingComplete = () => {
        setIsLoading(false);
    }

    // Use effect to handle API loading status
    useEffect(() => {
        if (!isLoading) {
            // Can also perform other actions after loading
        }
    }, [isLoading])

    /*return (
        /*<Stack.Navigator initialRouteName="Landing">
        {(!isLoggedIn || !userObj)?
            <>
            <Stack.Screen name="Landing" component={Landing} options={{headerShown: false}} />
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
            </>
            :
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        }
        </Stack.Navigator>
        <Stack.Navigator initialRouteName="Landing">
            {(isLoading) ?
            <>
                <Stack.Screen name="Startup" options={{ headerShown: false }}>
                    {props => <StartupScreen {...props}onLoadingComplete={handleApiLoadingComplete} />}
                </Stack.Screen>
            </>:
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                
            }
        </Stack.Navigator>
    )*/
        return (
            <Stack.Navigator initialRouteName="Startup">
            {isLoading && (
                <Stack.Screen
                    name="Startup"
                    options={{ headerShown: false }}
                >
                    {props => (
                        <StartupScreen
                            {...props}
                            onLoadingComplete={handleApiLoadingComplete}
                        />
                    )}
                </Stack.Screen>
            )}

            {!isLoading && !isLoggedIn && (
                <>
                    <Stack.Screen
                        name="Landing"
                        component={Landing}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Register"
                        component={Register}
                        options={{ headerShown: false }}
                    />
                </>
            )}

            {!isLoading && isLoggedIn && (
                <>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{headerShown: true}}
                />
                </>
                
            )}

            {/* Define other screens as needed */}
        </Stack.Navigator>
        );
}

export default Navigator;