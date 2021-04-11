import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Animated, PanResponder, useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';

import { movieApi } from '../lib/api';
import { Poster } from '../components';

const StyledContainer = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#000',
});

interface IStyledCard {
  height: number;
  zIndex: number;
}

const StyledCard = styled(Animated.View)<IStyledCard>(({ height, zIndex }) => ({
  width: '90%',
  height: height / 1.3,
  position: 'absolute',
  opacity: 0,
  zIndex,
}));

const Discovery = () => {
  const { width, height } = useWindowDimensions();

  const [discovery, setDiscovery] = useState({
    discover: [{ id: 0, poster_path: '' }],
    error: null,
  });
  const [topIndex, setTopIndex] = useState(0);

  const position = useMemo(() => new Animated.ValueXY(), []);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, { dx, dy }) => {
          position.setValue({ x: dx, y: dy });
        },
        onPanResponderRelease: () => {
          Animated.spring(position, {
            useNativeDriver: true,
            toValue: { x: 0, y: 0 },
          }).start();
        },
      }),
    [position]
  );

  const topCard = useMemo(
    () => ({
      opacity: 1,
      transform: [
        {
          rotate: position.x.interpolate({
            inputRange: [-width / 2, 0, width / 2],
            outputRange: ['-8deg', '0deg', '8deg'],
            extrapolate: 'clamp',
          }),
        },
        ...position.getTranslateTransform(),
      ],
    }),
    [position, width]
  );

  const secondCard = useMemo(
    () => ({
      opacity: position.x.interpolate({
        inputRange: [-width / 2, 0, width / 2],
        outputRange: [1, 0, 1],
        extrapolate: 'clamp',
      }),
      transform: [
        {
          scale: position.x.interpolate({
            inputRange: [-width / 2, 0, width / 2],
            outputRange: [1, 0.8, 1],
            extrapolate: 'clamp',
          }),
        },
      ],
    }),
    [position.x, width]
  );

  const getData = useCallback(async () => {
    const [discover, error] = await movieApi.discover();

    setDiscovery({ discover, error });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <StyledContainer>
      {discovery.discover.map((cover, index) => {
        if (index === topIndex) {
          return (
            <StyledCard
              key={cover.id}
              height={height}
              zIndex={1}
              style={topCard}
              {...panResponder.panHandlers}
            >
              <Poster poster={cover.poster_path} borderRadius={16} />
            </StyledCard>
          );
        } else if (index === topIndex + 1) {
          return (
            <StyledCard
              key={cover.id}
              height={height}
              zIndex={-index}
              style={secondCard}
            >
              <Poster poster={cover.poster_path} borderRadius={16} />
            </StyledCard>
          );
        }

        return (
          <StyledCard key={cover.id} height={height} zIndex={-index}>
            <Poster poster={cover.poster_path} borderRadius={16} />
          </StyledCard>
        );
      })}
    </StyledContainer>
  );
};

export default memo(Discovery);
