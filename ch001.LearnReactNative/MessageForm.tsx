import React, {useState, useRef, useEffect} from 'react';
import {Button, TextInput, View, Text} from 'react-native';

function MessageForm() {
  // const [text, setText] = useState<string>('');
  const [text, setText] = useState(''); // type 을 알 수 있기 때문에.
  const [lastMessage, setLastMessage] = useState<{
    message: String;
    date: Date;
    id: number;
  } | null>(null);
  const nextId = useRef<number>(1);
  const inputRef = useRef<TextInput | null>(null);

  const onPress = () => {
    setLastMessage({
      message: text,
      date: new Date(),
      id: nextId.current,
    });
    setText('');
    nextId.current += 1;
  };

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.focus();
  }, []);

  return (
    <View>
      <TextInput value={text} onChangeText={setText} ref={inputRef} />
      <Button title="PRESS ME" onPress={onPress} />
      {lastMessage && (
        <View>
          <Text>
            줄바꿈: 마지막 메시지: {lastMessage.message} (
            {lastMessage.date.toLocaleString()})
          </Text>
        </View>
      )}
    </View>
  );
}

export default MessageForm;
