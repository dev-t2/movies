import React, { FC, memo, ReactNode, useMemo } from 'react';
import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';

const StyledScrollView = styled.ScrollView({
  backgroundColor: '#000',
});

interface IScrollViewContainer {
  children: ReactNode;
  isReady: boolean;
}

const ScrollViewContainer: FC<IScrollViewContainer> = ({
  children,
  isReady,
}) => {
  const contentContainerStyle: StyleProp<ViewStyle> = useMemo(
    () => ({
      flex: isReady ? undefined : 1,
      justifyContent: isReady ? 'flex-start' : 'center',
    }),
    [isReady]
  );

  return (
    <StyledScrollView contentContainerStyle={contentContainerStyle}>
      {isReady ? children : <ActivityIndicator color="#fff" size="large" />}
    </StyledScrollView>
  );
};

export default memo(ScrollViewContainer);
