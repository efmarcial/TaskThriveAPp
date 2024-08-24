import React, { useContext } from "react";
import { View, Text, FlatList } from "react-native-web";
import { Context } from "../globalContext/globalContext";
import containers from "../styles/containers";


function Profile({navigation, route, props}) {
    const globalContext = useContext(Context);
    const {userObj} = globalContext;

    return (
        <View style={containers(appSettings).main_container}>
            <Text style={containers(appSettings).main_text}>Profile</Text>
            <FlatList
                data={userObj}
                renderItem={({item})=> (
                    <View key={item}>
                        <Text>{item}</Text>
                    </View>
                )}
            />
        </View>
    )
}

export default Profile;