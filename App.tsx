import 'react-native-gesture-handler'
import React from "react"
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { FontAwesome5 } from '@expo/vector-icons'

//Omat sovellukset alkaa tästä
import HelloWold from './HelloWorld'
import HelloWorldInput from "./HelloWorldInput"
import JsonList from "./JsonList"
import YLETekstiTV100 from "./YLETekstiTV100"
import YLETekstiTV from "./YLETekstiTV"
import NWTuotteetList from "./NWTuotteetList"
import NWTuotteetListPop from "./NWTuotteetListPop"
import NWTuotteetListModular from "./NWTuotteetListModular"

const App = () => {
  const Tab = createMaterialTopTabNavigator()
  const iconSize = 22  // Ylänavin iconien koko

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#ffffff',
          inactiveTintColor: '#000000',
          showLabel: false,
          labelStyle: { fontSize: 10 },
          showIcon: true,
          indicatorStyle: { height:50 },
          style: { backgroundColor: '#31b3c0', paddingTop: 40, },
        }}
      >
        <Tab.Screen name="HelloWorld" component={HelloWold} options={{ tabBarIcon: () => <FontAwesome5 name="chess-pawn" color="#333" size={iconSize} /> }} />
        <Tab.Screen name="HelloWorld Input" component={HelloWorldInput} options={{ tabBarIcon: () => <FontAwesome5 name="chess-knight" color="#333" size={iconSize} /> }} />
        <Tab.Screen name="JsonList" component={JsonList} options={{ tabBarIcon: () => <FontAwesome5 name="chess-bishop" color="#333" size={iconSize} /> }} />
        <Tab.Screen name="YLETekstiTV100" component={YLETekstiTV100} options={{ tabBarIcon: () => <FontAwesome5 name="database" color="#333" size={iconSize} /> }} />
        <Tab.Screen name="YLETekstiTV" component={YLETekstiTV} options={{ tabBarIcon: () => <FontAwesome5 name="newspaper" color="#333" size={iconSize} /> }} />
        <Tab.Screen name="NWTuotteetListModular" component={NWTuotteetListModular} options={{ tabBarIcon: () => <FontAwesome5 name="ad" color="#333" size={iconSize} /> }} />

      </Tab.Navigator>
    </NavigationContainer>
  )
}
export default App