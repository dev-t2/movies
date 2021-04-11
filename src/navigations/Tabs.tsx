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

import { Discovery, Movie, Search } from '../screens';
import { discoveryOptions, movieOptions, searchOptions } from './options';

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
      <Tabs.Screen name="Movie" component={Movie} options={movieOptions} />
      <Tabs.Screen name="Search" component={Search} options={searchOptions} />
      <Tabs.Screen
        name="Discovery"
        component={Discovery}
        options={discoveryOptions}
      />
    </Tabs.Navigator>
  );
});
