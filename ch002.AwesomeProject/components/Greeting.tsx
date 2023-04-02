import React from 'react';
import {View, Text} from 'react-native';

function Greeting(props) {
  return (
    <View>
      <Text>안녕하세요 {props.name}!</Text>
    </View>
  );
}

// 함수에 props 를 넣었네.
Greeting.defaultProps = {
  name: '리액트 네이티브',
};

export default Greeting;
