import React, { memo, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, useWindowDimensions } from 'react-native';
import Swiper from 'react-native-web-swiper';
import styled from 'styled-components/native';

import { movieApi } from '../lib/api';
import { Slide } from '../components/movie';

const StyledContainer = styled.View({
  flex: 1,
  justifyContent: 'center',
  backgroundColor: '#000',
});

interface IStyledSwiper {
  width: number;
  height: number;
}

const StyledSwiperContainer = styled.View<IStyledSwiper>(
  ({ width, height }) => ({
    width,
    height: height / 4,
  })
);

const Movie = () => {
  const { width, height } = useWindowDimensions();

  const [movies, setMovies] = useState({
    isReady: false,
    nowPlaying: [
      {
        id: 0,
        backdrop_path: '',
        poster_path: '',
        title: '',
        vote_average: 0,
        overview: '',
      },
    ],
    popular: [],
    upcoming: [],
    error: null,
  });

  const getData = useCallback(async () => {
    const [nowPlaying, nowPlayingError] = await movieApi.nowPlaying();
    const [popular, popularError] = await movieApi.popular();
    const [upcoming, upcomingError] = await movieApi.upcoming();

    const error = nowPlayingError || popularError || upcomingError;

    setMovies({ isReady: true, nowPlaying, popular, upcoming, error });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <StyledContainer>
      {movies.isReady ? (
        <>
          <StyledSwiperContainer width={width} height={height}>
            <Swiper controlsEnabled={false} loop timeout={4}>
              {movies.nowPlaying.map(movie => (
                <Slide
                  key={movie.id}
                  id={movie.id}
                  backdropImage={movie.backdrop_path}
                  poster={movie.poster_path}
                  title={movie.title}
                  vote={movie.vote_average}
                  overview={movie.overview}
                />
              ))}
            </Swiper>
          </StyledSwiperContainer>
        </>
      ) : (
        <ActivityIndicator color="#fff" size="large" />
      )}
    </StyledContainer>
  );
};

export default memo(Movie);
