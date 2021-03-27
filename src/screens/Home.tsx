import React, { FC, memo, useCallback } from 'react';
import { Button, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackProps } from '../navigations/Stack';

interface IHome {
  navigation: StackNavigationProp<StackProps, 'Home'>;
}

const Home: FC<IHome> = ({ navigation }) => {
  const onPress = useCallback(() => {
    navigation.navigate('Detail');
  }, [navigation]);

  return (
    <View>
      <Text>Home</Text>
      <Button title="Go to Detail" onPress={onPress} />
    </View>
  );
};

export default memo(Home);
