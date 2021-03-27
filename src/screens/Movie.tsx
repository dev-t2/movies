import React, { FC, memo, useCallback } from 'react';
import { Button, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackProps } from '../navigations/Stack';

interface IMovie {
  navigation: StackNavigationProp<StackProps, 'Tabs'>;
}

const Movie: FC<IMovie> = ({ navigation }) => {
  const onPress = useCallback(() => {
    navigation.navigate('Detail');
  }, [navigation]);

  return (
    <View>
      <Text>Movie</Text>
      <Button title="Movie" onPress={onPress} />
    </View>
  );
};

export default memo(Movie);
