import React, { memo, useCallback, useEffect, useState } from 'react';

import { movieApi } from '../lib/api';
import {
  Horizontal,
  HorizontalSlider,
  HorizontalSwiper,
  List,
  ScrollViewContainer,
  Vertical,
} from '../components';
import { Slide } from '../components/movie';

const Movie = () => {
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
    <ScrollViewContainer isReady={movies.isReady} refreshFunction={getData}>
      <HorizontalSwiper>
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
      </HorizontalSwiper>

      <HorizontalSlider title="Upcoming Movies">
        {movies.upcoming.map(movie => (
          <Vertical
            key={movie.id}
            id={movie.id}
            poster={movie.poster_path}
            title={movie.title}
            releaseDate={movie.release_date}
          />
        ))}
      </HorizontalSlider>

      <List title="Popular Movies">
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
      </List>
    </ScrollViewContainer>
  );
};

export default memo(Movie);
