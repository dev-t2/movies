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
        onPanResponderMove: (event, { dx, dy }) => {
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

  const topStyle = useMemo(() => {
    const rotate = position.x.interpolate({
      inputRange: [-width / 2, 0, width / 2],
      outputRange: ['-8deg', '0deg', '8deg'],
      extrapolate: 'clamp',
    });

    return {
      transform: [{ rotate }, ...position.getTranslateTransform()],
    };
  }, [position, width]);

  const otherStyle = useMemo(() => {
    const opacity = position.x.interpolate({
      inputRange: [-width / 2, 0, width / 2],
      outputRange: ['0.9', '0.45', '0.9'],
      extrapolate: 'clamp',
    });

    return { opacity };
  }, [position, width]);

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
        return (
          <StyledCard
            key={cover.id}
            height={height}
            zIndex={index === topIndex ? 1 : -index}
            style={index === topIndex ? topStyle : otherStyle}
            {...panResponder.panHandlers}
          >
            <Poster poster={cover.poster_path} borderRadius={16} />
          </StyledCard>
        );
      })}
    </StyledContainer>
  );
};

export default memo(Discovery);
