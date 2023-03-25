import React from 'react';
import {Text, View} from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {RouteProp, useRoute} from '@react-navigation/native';
import MainTab, {MainTabNavigatioknScreenParams} from './MainTab';

type RootStackParamList = {
  // Home: undefined;
  MainTab: MainTabNavigatioknScreenParams;
  Detail: {
    id: number;
  };
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

type DetailScreenRouteProps = RouteProp<RootStackParamList, 'Detail'>;

function DetailScreen() {
  const {params} = useRoute<DetailScreenRouteProps>();
  return (
    <View>
      <Text>Detail {params.id}</Text>
    </View>
  );
}

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={MainTab}
        name="MainTab"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen component={DetailScreen} name="Detail" />
    </Stack.Navigator>
  );
}

export default RootStack;
