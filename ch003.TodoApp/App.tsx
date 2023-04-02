/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  // ScrollView,
  // StatusBar,
  // StyleSheet,
  // Text,
  // useColorScheme,
  View,
} from 'react-native';
import DateHead from './components/DateHead';

function App(): JSX.Element {
  const today = new Date();
  console.log(today);
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <View style={{flex: 1, backgroundColor: 'blue'}} /> */}
      <DateHead date={today} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  //
});

export default App;
