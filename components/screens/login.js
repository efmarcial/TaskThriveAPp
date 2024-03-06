import React, {useContext, useState} from "react";
import { View, Text, TextInput, TouchableOpacity} from "react-native";
import { Context } from "../globalContext/globalContext";
import containers from "../styles/containers";
import fonts from "../styles/fonts";
import inputs from "../styles/inputs";
import margins from "../styles/margins";
import buttons from "../styles/buttons";

function Login({navigation, route, props}) {

    const globalContext = useContext(Context);
    const {setIsLoggedIn, appSettings} = globalContext;

    const [securePassword, setSecurePassword] = useState(true);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    function handleLogin() {
        console.log("Loggin In");
        console.log(email);
        console.log(password);

        setIsLoggedIn(true);
        navigation.navigate("Home");
    };


    return (
        <View style={containers(appSettings).outerPage}>
            <View style={containers(appSettings).formBox}>
                <Text style={[fonts(appSettings).h1, margins.top30Percent]}>LOGIN</Text>

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