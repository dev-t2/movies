import React, { memo, useCallback, useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import { Poster } from '../components';

import { movieApi } from '../lib/api';

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

  return (
    <StyledContainer>
      {discovery.discover.reverse().map(cover => (
        <StyledCard key={cover.id} height={height}>
          <Poster poster={cover.poster_path} borderRadius={16} />
        </StyledCard>
      ))}
    </StyledContainer>
  );
};

export default memo(Discovery);
