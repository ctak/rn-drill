/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import HomeScreen from './screens/HomeScreen';
// import DetailScreen from './screens/DetailScreen';
// import HeaderlessScreen from './screens/HeaderlessScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import HomeScreen from './screens/HomeScreen';

// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeScreen({navigation}) {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}

function SettingScreen({navigation}) {
  return (
    <View>
      <Text>Setting</Text>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerPosition="left"
        backBehavior="history">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Setting" component={SettingScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
