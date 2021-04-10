import React, { memo, useCallback, useEffect, useState } from 'react';
import { PanResponder, useWindowDimensions } from 'react-native';
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
}

const StyledCard = styled.View<IStyledCard>(({ height }) => ({
  width: '90%',
  height: height / 1.3,
  position: 'absolute',
}));

const Discovery = () => {
  const { height } = useWindowDimensions();

  const [discovery, setDiscovery] = useState({
    discover: [{ id: 0, poster_path: '' }],
    error: null,
  });

  const getData = useCallback(async () => {
    const [discover, error] = await movieApi.discover();

    setDiscovery({ discover, error });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, { dx }) => {
      console.log({ dx });
    },
  });

  return (
    <StyledContainer>
      {discovery.discover.reverse().map(cover => (
        <StyledCard
          key={cover.id}
          height={height}
          {...panResponder.panHandlers}
        >
          <Poster poster={cover.poster_path} borderRadius={16} />
        </StyledCard>
      ))}
    </StyledContainer>
  );
};

export default memo(Discovery);
