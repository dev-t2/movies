import React, { memo, useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { movieApi } from '../lib/api';

const Movie = () => {
  const [movie, setMovie] = useState({
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

    setMovie({ nowPlaying, popular, upcoming, error });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <Text style={{ color: '#fff' }}>{movie.nowPlaying.length}</Text>
      <Text style={{ color: '#fff' }}>{movie.popular.length}</Text>
      <Text style={{ color: '#fff' }}>{movie.upcoming.length}</Text>
      <Text style={{ color: '#fff' }}>{movie.error}</Text>
    </View>
  );
};

export default memo(Movie);
