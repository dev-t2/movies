import React, { memo } from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import Tabs from './Tabs';
import { Detail } from '../screens';

export type StackProps = {
  Tabs: undefined;
  Detail: undefined;
  Favorites: undefined;
  Movie: undefined;
  Search: undefined;
  Tv: undefined;
};

const Stack = createStackNavigator<StackProps>();

const screenOptions: StackNavigationOptions = { headerTitleAlign: 'center' };

export default memo(() => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
});
