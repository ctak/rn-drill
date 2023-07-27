import React from 'react';
import RootStack from './screens/RootStack';
import {NavigationContainer} from '@react-navigation/native';
import {UserContextProvider} from './contexts/UserContext';

function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </UserContextProvider>
  );
}

export default App;
