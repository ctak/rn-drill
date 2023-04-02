/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useCallback} from 'react';
// import type {PropsWithChildren} from 'react';
import {
  // Button,
  SafeAreaView,
  StyleSheet,
  // ScrollView,
  // StatusBar,
  // StyleSheet,
  // Text,
  // useColorScheme,
  // View,
} from 'react-native';
// import Box from './components/Box';
import Counter from './components/Counter';

function App(): JSX.Element {
  const [num, setNum] = useState(0);
  const onPlus = useCallback(() => setNum(prev => prev + 1), []);
  const onMinus = useCallback(() => setNum(prev => prev - 1), []);
  return (
    <SafeAreaView style={styles.full}>
      <Counter count={num} onIncrease={onPlus} onDecrease={onMinus} />
    </SafeAreaView>
  );
  // const [visible, setVisible] = useState(true);
  // const onPress = () => setVisible(!visible);
  // return (
  //   <SafeAreaView>
  //     <Button title="토글" onPress={onPress} />
  //     {visible && <Box rounded size="large" color="blue" />}
  //   </SafeAreaView>
  // );
}

const styles = StyleSheet.create({
  full: {
    flex: 1,
    // backgroundColor: 'cyan',
  },
});

export default App;
