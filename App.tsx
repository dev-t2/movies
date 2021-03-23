import React, { memo, useCallback, useState } from 'react';
import { Text } from 'react-native';
import AppLoading from 'expo-app-loading';

import { cacheFonts, cacheImages } from './src/lib/cache';

const App = () => {
  const [isReady, setIsReady] = useState(false);

  const startAsync = useCallback(async () => {
    const images = cacheImages([]);
    const fonts = cacheFonts([]);

    return Promise.all([...images, ...fonts]);
  }, []);

  const onFinish = useCallback(() => {
    setIsReady(true);
  }, []);

  return isReady ? (
    <Text>Movies</Text>
  ) : (
    <AppLoading
      startAsync={startAsync}
      onFinish={onFinish}
      onError={console.error}
    />
  );
};

export default memo(App);
