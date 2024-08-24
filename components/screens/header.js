import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Context } from "../globalContext/globalContext";

const Header = ({username}) => {
    const navigation = useNavigation();
    const {isLoggedIn } = useContext(Context);

    //Handle User check
    const handleProfilePress = () => {
        if (isLoggedIn) {
            navigation.navigate('Profile'); // Navigate to profile if True
        }else {
            navigation.navigate('Login'); // Navigate to Login if not logged in
        }
    }

    return (
        <View style={styles.header}>
            {/* Nav-Burger Icon */}
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Icon name="menu" size={30} color="black" />
            </TouchableOpacity>


    
            {/* User Icon to the navigation to Profile */}
            <TouchableOpacity onPress={handleProfilePress}>
                <Icon name="person-circle" size={30} color="black" />
            </TouchableOpacity>
        </View>
    )
}



const styles = StyleSheet.create({
    header: {
        width:'100%',
        height: 100,  
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: {width: 100, height: 2},
        shadowOpacity: 0.1,
        shadowRadius:4,
        elevation: 4,
        borderRadius: 10

    },
    headerTitle: {
        fontSize: 20, 
        fontWeight: 'bold'
    }
})

export default Header;