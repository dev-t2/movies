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

  const nextCard = useCallback(() => {
    setTopIndex(prev => (prev + 1) % discovery.discover.length);

    position.setValue({ x: 0, y: 0 });
  }, [discovery.discover, position]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, { dx, dy }) => {
          position.setValue({ x: dx, y: dy });
        },
        onPanResponderRelease: (_, { dx, dy }) => {
          if (dx >= 240) {
            Animated.spring(position, {
              useNativeDriver: true,
              toValue: { x: width * 1.2, y: dy },
            }).start(nextCard);
          } else if (dx <= -240) {
            Animated.spring(position, {
              useNativeDriver: true,
              toValue: { x: -width * 1.2, y: dy },
            }).start(nextCard);
          } else {
            Animated.spring(position, {
              useNativeDriver: true,
              toValue: { x: 0, y: 0 },
            }).start();
          }
        },
      }),
    [position, width, nextCard]
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
        } else if (index === (topIndex + 1) % discovery.discover.length) {
          return (
            <StyledCard
              key={cover.id}
              height={height}
              zIndex={-index}
              style={secondCard}
              {...panResponder.panHandlers}
            >
              <Poster poster={cover.poster_path} borderRadius={16} />
            </StyledCard>
          );
        } else {
          return (
            <StyledCard
              key={cover.id}
              height={height}
              zIndex={-index}
              {...panResponder.panHandlers}
            >
              <Poster poster={cover.poster_path} borderRadius={16} />
            </StyledCard>
          );
        }
      })}
    </StyledContainer>
  );
};

export default memo(Discovery);
