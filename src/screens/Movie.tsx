import React, { memo, useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { movieApi } from '../lib/api';

const Movie = () => {
  const [movies, setMovies] = useState({
    nowPlaying: [],
    popular: [],
    upcoming: [],
    error: null,
  });

  const getData = useCallback(async () => {
    const [nowPlaying, nowPlayingError] = await movieApi.nowPlaying();
    const [popular, popularError] = await movieApi.popular();
    const [upcoming, upcomingError] = await movieApi.upcoming();

    const error = nowPlayingError || popularError || upcomingError;

    setMovies({ nowPlaying, popular, upcoming, error });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <Text style={{ color: '#fff' }}>{movies.nowPlaying.length}</Text>
      <Text style={{ color: '#fff' }}>{movies.popular.length}</Text>
      <Text style={{ color: '#fff' }}>{movies.upcoming.length}</Text>
      <Text style={{ color: '#fff' }}>{movies.error}</Text>
    </View>
  );
};

export default memo(Movie);
