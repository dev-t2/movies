import React, { memo } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StackProps } from './Stack';
import { Favorites, Movie, Search, Tv } from '../screens';

const Tabs = createBottomTabNavigator();

interface ITabs {
  navigation: StackNavigationProp<StackProps, 'Tabs'>;
}

export default memo<ITabs>(() => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Movie" component={Movie} />
      <Tabs.Screen name="TV" component={Tv} />
      <Tabs.Screen name="Search" component={Search} />
      <Tabs.Screen name="Favorites" component={Favorites} />
    </Tabs.Navigator>
  );
});
