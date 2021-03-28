import React from 'react';
import { Platform } from 'react-native';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const isApplePlatform = Platform.OS === 'ios' || Platform.OS === 'macos';
const size = 24;

export const movieIcon: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Ionicons
      name={isApplePlatform ? 'ios-film' : 'md-film'}
      color={focused ? '#fff' : '#808080'}
      size={size}
    />
  ),
};

export const tvIcon: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Ionicons
      name={isApplePlatform ? 'ios-tv' : 'md-tv'}
      color={focused ? '#fff' : '#808080'}
      size={size}
    />
  ),
};

export const searchIcon: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Ionicons
      name={isApplePlatform ? 'ios-search' : 'md-search'}
      color={focused ? '#fff' : '#808080'}
      size={size}
    />
  ),
};

export const favoritesIcon: BottomTabNavigationOptions = {
  tabBarIcon: ({ focused }) => (
    <Ionicons
      name={isApplePlatform ? 'ios-heart' : 'md-heart'}
      color={focused ? '#fff' : '#808080'}
      size={size}
    />
  ),
};
