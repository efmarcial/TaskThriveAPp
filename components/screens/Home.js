import React, {useContext} from "react";
import { View, Text,FlatList,StyleSheet, TouchableOpacity, } from "react-native";
import { Context } from "../globalContext/globalContext";
import containers from "../styles/containers";
import fonts from "../styles/fonts";
import buttons from "../styles/buttons";
import Header from "./header";

function Home({navigation, route, props}) {

    const globalContext = useContext(Context);
    const {isLoggedIn, appSettings, appServices, username} = globalContext;

    return (
        /*<View  style={styles.container}>
            <Header username={userName} />
           {appServices.map((service) => (
            <View key={service.id} style={styles.box}>
                <Text style={styles.text}>{service.title}</Text>
            </View>
           ))}
        </View>*/
        <View  style={styles.container}>
            <Header username={username} />
            <Text style={styles.mainText}>Welcome, {username}</Text>
            <FlatList
                data={appServices}
                renderItem={({item})=> (
                    <View key={item.id} style={styles.box}>
                        <Text style={styles.text}>{item.title}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2} //Display items in a 2x2 grid
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff'
    },
    box: {
        width: '48%', // Adjust width to make it 2x2 grid
        height: 150, 
        backgroundColor: 'lightgreen', // Change box color
        borderRadius: 10, 
        justifyContent: 'center', 
        alignItems: 'center', 
        margin: '1%', // Add margin to space out items
    }, 
    text: {
        fontSize: 18, 
        color: '#fff',
    },
    mainText: {
        fontSize: 30,
        fontWeight:'bold',
    }
});

export default Home;