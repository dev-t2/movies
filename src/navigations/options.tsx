import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

const IS_APPLE_PLATFORM = Platform.OS === 'ios' || Platform.OS === 'macos';
const SIZE = 24;

export const movieOptions: BottomTabNavigationOptions = {
  tabBarVisible: false,
  tabBarIcon: ({ focused }) => {
    return (
      <Ionicons
        name={IS_APPLE_PLATFORM ? 'ios-film' : 'md-film'}
        color={focused ? '#fff' : '#808080'}
        size={SIZE}
      />
    );
  },
};

export const searchOptions: BottomTabNavigationOptions = {
  tabBarVisible: false,
  tabBarIcon: ({ focused }) => {
    return (
      <Ionicons
        name={IS_APPLE_PLATFORM ? 'ios-search' : 'md-search'}
        color={focused ? '#fff' : '#808080'}
        size={SIZE}
      />
    );
  },
};

export const discoveryOptions: BottomTabNavigationOptions = {
  tabBarVisible: false,
  tabBarIcon: ({ focused }) => {
    return (
      <Ionicons
        name={IS_APPLE_PLATFORM ? 'ios-heart' : 'md-heart'}
        color={focused ? '#fff' : '#808080'}
        size={SIZE}
      />
    );
  },
};
