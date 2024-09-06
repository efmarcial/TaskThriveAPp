import React, { useContext } from "react";
import { View, Text, FlatList } from "react-native-web";
import { Context } from "../globalContext/globalContext";
import containers from "../styles/containers";


function Profile({navigation, route, props}) {
    const globalContext = useContext(Context);
    const {userObj, appSettings} = globalContext;

    return (
        <View style={containers(appSettings).main_container}>
            <Text style={containers(appSettings).main_text}>Profile</Text>
            
        </View>
    )
}

export default Profile;