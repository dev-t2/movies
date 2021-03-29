import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

const IS_APPLE_PLATFORM = Platform.OS === 'ios' || Platform.OS === 'macos';
const SIZE = 24;

export const movieIcon: BottomTabNavigationOptions = {
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

export const tvIcon: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => {
    return (
      <Ionicons
        name={IS_APPLE_PLATFORM ? 'ios-tv' : 'md-tv'}
        color={focused ? '#fff' : '#808080'}
        size={SIZE}
      />
    );
  },
};

export const searchIcon: BottomTabNavigationOptions = {
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

export const favoritesIcon: BottomTabNavigationOptions = {
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
