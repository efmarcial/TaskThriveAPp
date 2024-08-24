import React, {useContext} from "react";
import { StyleSheet, Dimensions } from "react-native";


const containers = (appSettings) => StyleSheet.create({
    main_container: {
        flex:1,
        padding: 10,
        backgroundColor: "#fff",

    },
    main_text: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    outerPage: {
        backgroundColor: ("backgroundColor" in appSettings)?appSettings['backgroundColor'] : "#ffffff",
        color: ("foregroundColor" in appSettings)?appSettings['foregroundColor'] : "#000000",
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        margin: 0,

    },

    formBox: {
        width: "60%",
        height: "60%",
        backgroundColor: "#6e7c85",
        margin:0,
        borderRadius: 15,
        padding: "5%",
    }

});

export default containers;