import React, { memo, useCallback, useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import Swiper from 'react-native-web-swiper';
import styled from 'styled-components/native';

import { movieApi } from '../lib/api';
import {
  Horizontal,
  ScrollViewContainer,
  Title,
  Vertical,
} from '../components';
import { Slide } from '../components/movie';
import HorizontalSlider from '../components/HorizontalSlider';

interface IStyledSwiperContainer {
  height: number;
}

const StyledSwiperContainer = styled.View<IStyledSwiperContainer>(
  ({ height }) => ({
    width: '100%',
    height: height / 4,
    marginBottom: 32,
  })
);

const StyledTitleContainer = styled.View({
  marginBottom: 16,
});

const Movie = () => {
  const { height } = useWindowDimensions();

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
    upcoming: [
      {
        id: 0,
        poster_path: '',
        title: '',
        release_date: '',
      },
    ],
    popular: [
      {
        id: 0,
        poster_path: '',
        title: '',
        vote_average: 0,
        overview: '',
      },
    ],
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
    <ScrollViewContainer isReady={movies.isReady}>
      <>
        <StyledSwiperContainer height={height}>
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

        <HorizontalSlider title="Upcoming Movies">
          {movies.upcoming.map(movie => (
            <Vertical
              key={movie.id}
              poster={movie.poster_path}
              title={movie.title}
              releaseDate={movie.release_date}
            />
          ))}
        </HorizontalSlider>

        <StyledTitleContainer>
          <Title title="Popular Movies" />
        </StyledTitleContainer>

        {movies.popular.map(movie => (
          <Horizontal
            key={movie.id}
            id={movie.id}
            poster={movie.poster_path}
            title={movie.title}
            vote={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </>
    </ScrollViewContainer>
  );
};

export default memo(Movie);
