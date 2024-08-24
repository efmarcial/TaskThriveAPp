import React, {useContext, useState} from "react";
import { View, Text, TextInput, TouchableOpacity, Alert} from "react-native";
import * as SecureStore from 'expo-secure-store';
import { Context } from "../globalContext/globalContext";
import containers from "../styles/containers";
import fonts from "../styles/fonts";
import inputs from "../styles/inputs";
import margins from "../styles/margins";
import buttons from "../styles/buttons";

function Login({navigation, route, props}) {

    const globalContext = useContext(Context);
    const {setIsLoggedIn, appSettings, domain, userObj, setUserObj,setAccessToken, setRefreshToken} = globalContext;

    const [securePassword, setSecurePassword] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    

    const handleLogin = async () => {
        setError("");

        const pageBody = JSON.stringify({
            username: email,
            password: password,
        });

        try{
            const response = await fetch(`${globalContext.domain}/api/v1.0/user/login-user/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: pageBody,
            });
            if (response.ok){
                const json = await response.json();

                //Extract tokens from the response
                const accessToken = json.token['access'];
                const refreshToken = json.token['refresh'];
                console.info('Access Token: ', accessToken);
                console.info('Refresh Token: ', refreshToken)

                // Save tokens securely
                //await SecureStore.setItemAsync('accessToken', accessToken);
                //await SecureStore.setItemAsync('refreshToken', refreshToken);

                // Update global context
                setUserObj(json);
                setAccessToken(accessToken);
                setRefreshToken(refreshToken);
                setIsLoggedIn(true);

                // Navigation to home screen
                //navigation.navigate('Home');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Invalid Credentials!');
            }
        } catch(error) {
            console.error("Login error:", error);
            Alert.alert('Login Failed', 'An error occured. Please try again.')
        }

    };




    return (
        <View style={containers(appSettings).outerPage}>
            <View style={containers(appSettings).formBox}>
                <Text style={[fonts(appSettings).h1, margins.top30Percent]}>LOGIN</Text>

                <Text style={[fonts(appSettings).errorLable]}>{error}</Text>

                <Text style={[fonts(appSettings).inputLable, margins.topTenPercent]}>Email Address</Text>
                <TextInput value={email} onChangeText={text => setEmail(text)} textContentType="username" autoComplete="email" style={inputs(appSettings).textInput} placeholder="Email"/>

                <Text style={[fonts(appSettings).inputLable, margins.topTenPercent]}>Password</Text>
                <TextInput value={password} onChangeText={text => setPassword(text)} secureTextEntry={securePassword} textContentType="password" autoComplete="password" style={inputs(appSettings).textInput} placeholder="Password"/>

                <TouchableOpacity style={[buttons(appSettings).login, margins.topTenPercent]} onPress={() => handleLogin()}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>   
        </View>
    )
}

export default Login;