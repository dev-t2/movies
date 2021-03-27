import React, { memo, useCallback } from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Movie = () => {
  const navigation = useNavigation();

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
