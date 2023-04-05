/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  // ScrollView,
  // StatusBar,
  // StyleSheet,
  // Text,
  // useColorScheme,
  // View,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import DateHead from './components/DateHead';
import AddTodo from './components/AddTodo';
import Empty from './components/Empty';
import TodoList from './components/TodoList';
import todosStorage from './storages/todosStorage';

function App(): JSX.Element {
  const today = new Date();

  const [todos, setTodos] = useState([
    {id: 1, text: '작업환경 설정', done: true},
    {id: 2, text: '리액트 네이티브 기초 공부', done: false},
    {id: 3, text: '투두리시트 만들어보기', done: false},
  ]);

  const onInsert = text => {
    const nextId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    const todo = {
      id: nextId,
      text,
      done: false,
    };

    setTodos(todos.concat(todo));
  };

  const onToggle = id => {
    // setTodos(prev =>
    //   todos.map(todo => (todo.id === id ? {...todo, done: !todo.done} : todo)),
    // );
    const nextTodos = todos.map(todo =>
      todo.id === id ? {...todo, done: !todo.done} : todo,
    );
    setTodos(nextTodos);
  };

  const onRemove = id => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  // useEffect() 를 여러번 쓰게 되는군.
  // 불러오기
  useEffect(() => {
    todosStorage
      .get()
      .then(setTodos) // 인자가 하나라면 Promise 에서 바로 reference 만 적어도 된다.
      .catch(console.error);
    // async function load() {
    //   try {
    //     const rawTodos = await AsyncStorage.getItem('todos');
    //     const savedTodos = JSON.parse(rawTodos);
    //     setTodos(savedTodos);
    //   } catch (e) {
    //     console.log('Failed to load todos');
    //   }
    // }
    // load();
  }, []);

  // 저장
  useEffect(() => {
    todosStorage.set(todos).catch(console.error);
    // async function save() {
    //   console.log('save() ...');
    //   try {
    //     await AsyncStorage.setItem('todos', JSON.stringify(todos));
    //   } catch (e) {
    //     console.log('Failed to save todos');
    //   }
    // }
    // save();

    // return () => {
    //   console.log('before update');
    // };
  }, [todos]);

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={styles.block}>
        <KeyboardAvoidingView
          // behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          behavior={Platform.select({ios: 'padding'})}
          style={styles.avoid}>
          <DateHead date={today} />
          {todos.length === 0 ? (
            <Empty />
          ) : (
            <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
          )}
          <AddTodo onInsert={onInsert} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoid: {
    flex: 1,
  },
});

export default App;
