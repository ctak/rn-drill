import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import FloatingWriteButton from '../components/FloatingWriteButton';
import LogContext from '../contexts/LogContext';
import FeedList from './FeedList';

function FeedsScreen() {
  const {logs} = useContext(LogContext);
  const [hidden, setHidden] = useState(false);

  // FeedList 의 상태에 따라서 Button 의 hidden 상태를 관리해야 하기에. FeedsScreen 에
  // function 이 있는 것이 당연하군.
  const onScrolledToBottom = isBottom => {
    if (hidden !== isBottom) {
      setHidden(isBottom); // hidden 은 isBottom 으로 설정되는군.
    }
  };

  return (
    <View style={styles.block}>
      <FeedList logs={logs} onScrolledToBottom={onScrolledToBottom} />
      <FloatingWriteButton hidden={hidden} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

export default FeedsScreen;
