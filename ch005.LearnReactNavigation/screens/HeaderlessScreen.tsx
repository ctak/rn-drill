import React from 'react';
import {View, Text, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// ios 에서는 헤더가 없으면 뒤로 갈 방법이 없어서 ...
function HeaderlessScreen({navigation}) {
  return (
    <SafeAreaView>
      <View>
        <Text>Header 가 없네?</Text>
        <Button onPress={() => navigation.pop()} title="뒤로 가기" />
      </View>
    </SafeAreaView>
  );
}

export default HeaderlessScreen;
