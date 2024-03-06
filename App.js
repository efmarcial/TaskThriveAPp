import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import Navigator from "./components/navigation/navigator";
import { Context, Provider } from "./components/globalContext/globalContext";
import { View } from "react-native";

function App(props){

  
  return (
    <Provider>
      <View style={{flex:1}}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </View>
    </Provider>
  )

}

export default App;