import React, { memo, useCallback, useState } from 'react';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import { cacheFonts, cacheImages } from './src/lib/cache';
import Stack from './src/navigations/Stack';

const App = () => {
  const [isReady, setIsReady] = useState(false);

  const startAsync = useCallback(async () => {
    const images = cacheImages([
      require('./assets/icon.png'),
      require('./assets/splash.png'),
    ]);

    const fonts = cacheFonts([Ionicons.font]);

    await Promise.all([...images, ...fonts]);
  }, []);

  const onFinish = useCallback(() => {
    setIsReady(true);
  }, []);

  return isReady ? (
    <>
      <StatusBar backgroundColor="#000" style="light" />

      <NavigationContainer>
        <Stack />
      </NavigationContainer>
    </>
  ) : (
    <AppLoading
      startAsync={startAsync}
      onFinish={onFinish}
      onError={console.error}
    />
  );
};

export default memo(App);
