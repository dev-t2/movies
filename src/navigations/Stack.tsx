import React, { memo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Detail, Home } from '../screens';

export type StackProps = {
  Home: undefined;
  Detail: undefined;
};

const Stack = createStackNavigator<StackProps>();

export default memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
});
