import React, { memo, useLayoutEffect } from 'react';
import {
  useNavigation,
  getFocusedRouteNameFromRoute,
  useRoute,
} from '@react-navigation/native';
import {
  BottomTabBarOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { Discovery, Movie, Search, Tv } from '../screens';
import { discoveryIcon, movieIcon, searchIcon, tvIcon } from './Icons';

const Tabs = createBottomTabNavigator();

const tabBarOptions: BottomTabBarOptions = {
  style: {
    backgroundColor: '#000',
    borderTopWidth: 0,
  },
  showLabel: false,
};

export default memo(() => {
  const route = useRoute();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const headerTitle = getFocusedRouteNameFromRoute(route) ?? 'Movie';

    navigation.setOptions({ headerTitle });
  }, [route, navigation]);

  return (
    <Tabs.Navigator tabBarOptions={tabBarOptions}>
      <Tabs.Screen name="Movie" component={Movie} options={movieIcon} />
      <Tabs.Screen name="TV" component={Tv} options={tvIcon} />
      <Tabs.Screen name="Search" component={Search} options={searchIcon} />
      <Tabs.Screen
        name="Discovery"
        component={Discovery}
        options={discoveryIcon}
      />
    </Tabs.Navigator>
  );
});
