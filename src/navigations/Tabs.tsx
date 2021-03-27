import React, { memo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Favorites, Movie, Search, Tv } from '../screens';

const Tabs = createBottomTabNavigator();

export default memo(() => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Movie" component={Movie} />
      <Tabs.Screen name="Tv" component={Tv} />
      <Tabs.Screen name="Search" component={Search} />
      <Tabs.Screen name="Favorites" component={Favorites} />
    </Tabs.Navigator>
  );
});
