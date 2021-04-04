import React, {
  FC,
  memo,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  StyleProp,
  ViewStyle,
} from 'react-native';
import styled from 'styled-components/native';

const StyledScrollView = styled.ScrollView({
  backgroundColor: '#000',
});

interface IScrollViewContainer {
  children: ReactNode;
  isReady?: boolean;
  refreshFunction: () => void;
}

const ScrollViewContainer: FC<IScrollViewContainer> = ({
  children,
  isReady = true,
  refreshFunction,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const contentContainerStyle: StyleProp<ViewStyle> = useMemo(
    () => ({
      flex: isReady ? undefined : 1,
      justifyContent: isReady ? 'flex-start' : 'center',
    }),
    [isReady]
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    await refreshFunction();

    setRefreshing(false);
  }, [refreshFunction]);

  return (
    <StyledScrollView
      contentContainerStyle={contentContainerStyle}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {isReady ? children : <ActivityIndicator color="#fff" size="large" />}
    </StyledScrollView>
  );
};

export default memo(ScrollViewContainer);
