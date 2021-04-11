import React, { memo, useCallback, useMemo, useState } from 'react';
import { Animated, PanResponder, useWindowDimensions } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';

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
  width: '88%',
  height: '80%',
  position: 'absolute',
  opacity: 0,
  zIndex,
}));

type IDiscoveryRoute = {
  discovery: { movies: [{ id: number; poster_path: string }] };
};

const Discovery = () => {
  const {
    params: { movies },
  } = useRoute<RouteProp<IDiscoveryRoute, 'discovery'>>();

  const { width, height } = useWindowDimensions();

  const [topIndex, setTopIndex] = useState(0);

  const position = useMemo(() => new Animated.ValueXY(), []);

  const nextCard = useCallback(() => {
    setTopIndex(prev => (prev + 1) % movies.length);

    position.setValue({ x: 0, y: 0 });
  }, [movies, position]);

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

  const firstCard = useMemo(
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
        outputRange: [1, 0.1, 1],
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

  return (
    <StyledContainer>
      {movies.map((movie, index) => {
        if (index === topIndex) {
          return (
            <StyledCard
              key={movie.id}
              height={height}
              zIndex={1}
              style={firstCard}
              {...panResponder.panHandlers}
            >
              <Poster poster={movie.poster_path} borderRadius={16} />
            </StyledCard>
          );
        } else if (index === (topIndex + 1) % movies.length) {
          return (
            <StyledCard
              key={movie.id}
              height={height}
              zIndex={-index}
              style={secondCard}
              {...panResponder.panHandlers}
            >
              <Poster poster={movie.poster_path} borderRadius={16} />
            </StyledCard>
          );
        } else {
          return (
            <StyledCard
              key={movie.id}
              height={height}
              zIndex={-index}
              {...panResponder.panHandlers}
            >
              <Poster poster={movie.poster_path} borderRadius={16} />
            </StyledCard>
          );
        }
      })}
    </StyledContainer>
  );
};

export default memo(Discovery);
