import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';

import { getImageUri, movieApi } from '../lib/api';
import { openBrowser } from '../lib/browser';
import { Poster, ScrollViewContainer, Vote } from '../components';
import { OpenLink } from '../components/details';

interface IStyledBackdropImage {
  height: number;
}

const StyledBackdropImage = styled.Image<IStyledBackdropImage>(
  ({ height }) => ({
    width: '100%',
    height: height / 3,
    opacity: 0.4,
    marginTop: 8,
  })
);

interface IStyledHeaderContainer {
  height: number;
}

const StyledHeaderContainer = styled.View<IStyledHeaderContainer>(
  ({ height }) => ({
    width: '100%',
    height: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
    bottom: height / 6,
    marginBottom: 56,
  })
);

interface IStyledPosterContainer {
  width: number;
  height: number;
}

const StyledPosterContainer = styled.View<IStyledPosterContainer>(
  ({ width, height }) => ({
    width: width / 3.8,
    height: height / 4.8,
  })
);

const StyledInfoContainer = styled.View({
  width: '56%',
  marginTop: 32,
  marginLeft: 24,
});

const StyledTitle = styled.Text({
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 24,
  marginBottom: 4,
});

const StyledContentsContainer = styled.View({
  paddingHorizontal: 24,
  marginBottom: 16,
});

const StyledContentsTitle = styled.Text({
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 8,
});

const StyledContents = styled.Text({
  color: '#fff',
  opacity: 0.8,
  paddingHorizontal: 8,
});

type IDetailRoute = {
  details: { id: number };
};

interface IDetails {
  isReady: boolean;
  backdrop_path: string;
  poster_path: string;
  title: string;
  vote_average: number;
  overview: string;
  genres: [{ name: string }?];
  runtime: number;
  videos: { results: [{ key: string; name: string }?] };
  error: null;
}

const Details = () => {
  const {
    params: { id },
  } = useRoute<RouteProp<IDetailRoute, 'details'>>();

  const { width, height } = useWindowDimensions();

  const [details, setDetails] = useState<IDetails>({
    isReady: false,
    backdrop_path: '',
    poster_path: '',
    title: '',
    vote_average: 0,
    overview: '',
    genres: [],
    runtime: 0,
    videos: { results: [] },
    error: null,
  });

  const source = useMemo(() => ({ uri: getImageUri(details.backdrop_path) }), [
    details.backdrop_path,
  ]);

  const getData = useCallback(async () => {
    const [details, error] = await movieApi.details(id);

    setDetails({ isReady: true, ...details, error });
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  const onPressYoutube = useCallback(
    (key?: string) => () => {
      if (key) {
        openBrowser(`https://www.youtube.com/watch?v=${key}`);
      }
    },
    []
  );

  return (
    <ScrollViewContainer isReady={details.isReady} refreshFunction={getData}>
      <SafeAreaView>
        <StyledBackdropImage source={source} height={height} />

        <StyledHeaderContainer height={height}>
          <StyledPosterContainer width={width} height={height}>
            <Poster poster={details.poster_path} />
          </StyledPosterContainer>

          <StyledInfoContainer>
            <StyledTitle>{details.title}</StyledTitle>
            <Vote vote={details.vote_average} />
          </StyledInfoContainer>
        </StyledHeaderContainer>

        {details.overview && (
          <StyledContentsContainer>
            <StyledContents>{details.overview}</StyledContents>
          </StyledContentsContainer>
        )}

        {details.genres.length > 0 && (
          <StyledContentsContainer>
            <StyledContentsTitle>장르</StyledContentsTitle>
            <StyledContents>
              {details.genres.map(genre => `${genre?.name}    `)}
            </StyledContents>
          </StyledContentsContainer>
        )}

        {details.runtime !== 0 && (
          <StyledContentsContainer>
            <StyledContentsTitle>러닝타임</StyledContentsTitle>
            <StyledContents>{details.runtime}분</StyledContents>
          </StyledContentsContainer>
        )}

        {details.videos.results.length > 0 && (
          <StyledContentsContainer>
            <StyledContentsTitle>관련 영상</StyledContentsTitle>
            {details.videos.results.map(result => (
              <OpenLink
                key={result?.key}
                text={result?.name}
                onPress={onPressYoutube(result?.key)}
              />
            ))}
          </StyledContentsContainer>
        )}
      </SafeAreaView>
    </ScrollViewContainer>
  );
};

export default memo(Details);
