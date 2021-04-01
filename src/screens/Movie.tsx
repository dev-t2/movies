import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import Swiper from 'react-native-web-swiper';
import styled from 'styled-components/native';

import { movieApi } from '../lib/api';
import { Horizontal, Title, Vertical } from '../components';
import { Slide } from '../components/movie';

const StyledScrollView = styled.ScrollView({
  backgroundColor: '#000',
});

interface IWindow {
  height: number;
}

const StyledSwiperContainer = styled.View<IWindow>(({ height }) => ({
  width: '100%',
  height: height / 4,
  marginBottom: 32,
}));

const StyledTitleContainer = styled.View({
  marginBottom: 16,
});

const StyledVerticalContainer = styled.View<IWindow>(({ height }) => ({
  width: '100%',
  height: height / 4,
  marginBottom: 32,
}));

const StyledVertical = styled.ScrollView({
  marginLeft: 16,
});

const StyledUpComingContainer = styled.View({});

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
    popular: [
      {
        id: 0,
        poster_path: '',
        title: '',
        vote_average: 0,
      },
    ],
    upcoming: [
      {
        id: 0,
        poster_path: '',
        title: '',
        release_date: '',
        overview: '',
      },
    ],
    error: null,
  });

  const verticalScrollViewStyle: StyleProp<ViewStyle> = useMemo(
    () => ({
      flex: movies.isReady ? undefined : 1,
      justifyContent: movies.isReady ? 'flex-start' : 'center',
    }),
    [movies.isReady]
  );

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
    <StyledScrollView contentContainerStyle={verticalScrollViewStyle}>
      {movies.isReady ? (
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

          <StyledTitleContainer>
            <Title title="Popular Movies" />
          </StyledTitleContainer>

          <StyledVerticalContainer height={height}>
            <StyledVertical horizontal showsHorizontalScrollIndicator={false}>
              {movies.popular.map(movie => (
                <Vertical
                  key={movie.id}
                  poster={movie.poster_path}
                  title={movie.title}
                  vote={movie.vote_average}
                />
              ))}
            </StyledVertical>
          </StyledVerticalContainer>

          <StyledTitleContainer>
            <Title title="Upcoming Movies" />
          </StyledTitleContainer>

          <StyledUpComingContainer>
            {movies.upcoming.map(movie => (
              <Horizontal
                key={movie.id}
                id={movie.id}
                poster={movie.poster_path}
                title={movie.title}
                releaseDate={movie.release_date}
                overview={movie.overview}
              />
            ))}
          </StyledUpComingContainer>
        </>
      ) : (
        <ActivityIndicator color="#fff" size="large" />
      )}
    </StyledScrollView>
  );
};

export default memo(Movie);
