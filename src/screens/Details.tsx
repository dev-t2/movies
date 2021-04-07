import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';

import { getImageUri, movieApi } from '../lib/api';
import { Poster, ScrollViewContainer, Vote } from '../components';

const StyledHeader = styled.View({});

interface IStyledBackdropImage {
  height: number;
}

const StyledBackdropImage = styled.Image<IStyledBackdropImage>(
  ({ height }) => ({
    width: '100%',
    height: height / 3,
    opacity: 0.4,
  })
);

const StyledHeaderInfoContainer = styled.View({
  width: '100%',
  height: '100%',
  position: 'absolute',
});

interface IStyledPosterContainer {
  width: number;
  height: number;
}

const StyledPosterContainer = styled.View<IStyledPosterContainer>(
  ({ width, height }) => ({
    width: width / 4,
    height: height / 5,
  })
);

const StyledTitle = styled.Text({
  color: '#fff',
});

type IDetailRoute = {
  details: { id: number };
};

const Details = () => {
  const {
    params: { id },
  } = useRoute<RouteProp<IDetailRoute, 'details'>>();

  const navigation = useNavigation();

  const { width, height } = useWindowDimensions();

  const [details, setDetails] = useState({
    isReady: false,
    title: '',
    backdrop_path: '',
    poster_path: '',
    vote_average: 0,
    error: null,
  });

  const source = useMemo(() => ({ uri: getImageUri(details.backdrop_path) }), [
    details.backdrop_path,
  ]);

  const getData = useCallback(async () => {
    const [details, error] = await movieApi.details(id);

    setDetails({ isReady: true, ...details, error });
  }, [id]);

  console.log(details);

  useEffect(() => {
    getData();

    navigation.setOptions({ title: details.title });
  }, [getData, navigation, details.title]);

  return (
    <ScrollViewContainer isReady={details.isReady} refreshFunction={getData}>
      <StyledHeader>
        <StyledBackdropImage source={source} height={height} />

        <StyledHeaderInfoContainer>
          <StyledPosterContainer width={width} height={height}>
            <Poster poster={details.poster_path} />
          </StyledPosterContainer>

          <StyledTitle>{details.title}</StyledTitle>

          <Vote vote={details.vote_average} />
        </StyledHeaderInfoContainer>
      </StyledHeader>
    </ScrollViewContainer>
  );
};

export default memo(Details);
