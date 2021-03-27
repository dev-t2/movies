import React, { memo, useLayoutEffect } from 'react';
import {
  useNavigation,
  getFocusedRouteNameFromRoute,
  useRoute,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Favorites, Movie, Search, Tv } from '../screens';

const Tabs = createBottomTabNavigator();

export default memo(() => {
  const route = useRoute();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const headerTitle = getFocusedRouteNameFromRoute(route) ?? 'Movie';

    navigation.setOptions({ headerTitle });
  }, [route, navigation]);

  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Movie" component={Movie} />
      <Tabs.Screen name="TV" component={Tv} />
      <Tabs.Screen name="Search" component={Search} />
      <Tabs.Screen name="Favorites" component={Favorites} />
    </Tabs.Navigator>
  );
});
