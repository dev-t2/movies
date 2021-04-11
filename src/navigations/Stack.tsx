import React, { memo } from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import Tabs from './Tabs';
import { Details } from '../screens';

const Stack = createStackNavigator();

const screenOptions: StackNavigationOptions = {
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: '#000',
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTintColor: '#fff',
  headerShown: false,
};

export default memo(() => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
});
