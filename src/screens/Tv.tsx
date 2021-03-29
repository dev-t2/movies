import React, { memo, useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { tvApi } from '../lib/api';

const Tv = () => {
  const [tv, setTv] = useState({
    today: [],
    thisWeek: [],
    popular: [],
    topRated: [],
    error: null,
  });

  const getData = useCallback(async () => {
    const [today, todayError] = await tvApi.today();
    const [thisWeek, thisWeekError] = await tvApi.thisWeek();
    const [popular, popularError] = await tvApi.popular();
    const [topRated, topRatedError] = await tvApi.topRated();

    const error = todayError || thisWeekError || popularError || topRatedError;

    setTv({ today, thisWeek, popular, topRated, error });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <View>
      <Text style={{ color: '#000' }}>{tv.today.length}</Text>
      <Text style={{ color: '#000' }}>{tv.thisWeek.length}</Text>
      <Text style={{ color: '#000' }}>{tv.popular.length}</Text>
      <Text style={{ color: '#000' }}>{tv.topRated.length}</Text>
      <Text style={{ color: '#000' }}>{tv.error}</Text>
    </View>
  );
};

export default memo(Tv);
