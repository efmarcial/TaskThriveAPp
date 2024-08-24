import React, {useContext, useState} from "react";
import { View, Text, TextInput, TouchableOpacity} from "react-native";
import { Context } from "../globalContext/globalContext";
import containers from "../styles/containers";
import fonts from "../styles/fonts";
import inputs from "../styles/inputs";
import margins from "../styles/margins";
import buttons from "../styles/buttons";

function Register({navigation, route, props}) {

    const globalContext = useContext(Context);
    const {setIsLoggedIn, appSettings, domain, userObj, setUserObj,setAccessToken, setRefreshToken} = globalContext;

    const [securePassword, setSecurePassword] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    

    function handleLogin() {

        setError("");


        let page_body = JSON.stringify({
            "username" : email,
            "email" : email,
            "first_name" : firstName,
            "last_name" : lastName,
            "password" : password,
        });

        console.log("Fetching the Data");
        console.log("JSON to be sent: ", page_body);



        fetch(`${domain}/api/v1.0/user/create-user/`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json', 
            },
            body: page_body
        })
        .then(res=> {
            if (res.ok){
                
                return res.json()
            }else{

                setError("User already in database!");
                throw res.json();
            }
        })
        .then(json => {
            console.log('User Created');
            console.log("Refresh Token: ", json.token["refresh"]);
            console.log("Access Token: ", json.token["access"]);
            /*console.log(json.token['access']);*/
            setUserObj(json);
            setAccessToken(json.token["access"]);
            setRefreshToken(json.token["refresh"]);
            setIsLoggedIn(true);
            
        })
        .catch(error => {
            console.log("Error");
            console.log(error);
        })
    };


    return (
        <View style={containers(appSettings).outerPage}>
            <View style={containers(appSettings).formBox}>
                <Text style={[fonts(appSettings).h1, margins.top30Percent]}>LOGIN</Text>

                <Text style={[fonts(appSettings).errorLable]}>{error}</Text>

                <Text style={[fonts(appSettings).inputLable, margins.topTenPercent]}>First Name:</Text>
                <TextInput value={firstName} onChangeText={text => setFirstName(text)} textContentType="name" autoComplete="name" style={inputs(appSettings).textInput} placeholder="First Name"/>

                <Text style={[fonts(appSettings).inputLable, margins.topTenPercent]}>Last Name:</Text>
                <TextInput value={lastName} onChangeText={text => setLastName(text)} textContentType="name" autoComplete="name" style={inputs(appSettings).textInput} placeholder="Last Name"/>

                <Text style={[fonts(appSettings).inputLable, margins.topTenPercent]}>Email Address:</Text>
                <TextInput value={email} onChangeText={text => setEmail(text)} textContentType="username" autoComplete="email" style={inputs(appSettings).textInput} placeholder="Email"/>

                <Text style={[fonts(appSettings).inputLable, margins.topTenPercent]}>Password:</Text>
                <TextInput value={password} onChangeText={text => setPassword(text)} secureTextEntry={securePassword} textContentType="password" autoComplete="password" style={inputs(appSettings).textInput} placeholder="Password"/>

                <TouchableOpacity style={[buttons(appSettings).login, margins.topTenPercent]} onPress={() => handleLogin()}>
                    <Text>Register</Text>
                </TouchableOpacity>
            </View>   
        </View>
    )
}

export default Register;