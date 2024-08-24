import React from 'react';
import {View, StyleSheet} from 'react-native'
import Header from "./header"

const Layout = ({ children, userName}) => {
    return (
        <View style={styles.container}>
            <Header userName={userName}/>
            <View style={styles.content}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, 
    content: {
        flex: 1, 
        backgroundColor: '#f8f8f8',
        marginTop: 60, 
    }
})

export default Layout;