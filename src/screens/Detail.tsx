import React, { memo, useEffect } from 'react';
import { Text, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

type IDetailRoute = {
  Detail: { id: number; title: string };
};

const Detail = () => {
  const {
    params: { id, title },
  } = useRoute<RouteProp<IDetailRoute, 'Detail'>>();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title });
  }, [navigation, title]);

  return (
    <View>
      <Text>{id}</Text>
      <Text>{title}</Text>
    </View>
  );
};

export default memo(Detail);
