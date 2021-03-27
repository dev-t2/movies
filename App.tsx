import React, { memo, useCallback, useState } from 'react';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import Stack from './src/navigations/Stack';
import { cacheFonts, cacheImages } from './src/lib/cache';

const App = () => {
  const [isReady, setIsReady] = useState(false);

  const startAsync = useCallback(async () => {
    const images = cacheImages([]);
    const fonts = cacheFonts([]);

    await Promise.all([...images, ...fonts]);
  }, []);

  const onFinish = useCallback(() => {
    setIsReady(true);
  }, []);

  return isReady ? (
    <>
      <StatusBar style="light" />

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
