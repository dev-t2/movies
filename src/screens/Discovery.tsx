import React, { memo, useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { movieApi } from '../lib/api';

const Discovery = () => {
  const [discovery, setDiscovery] = useState({
    discover: [],
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
    <View>
      <Text style={{ color: '#000' }}>{discovery.discover.length}</Text>
      <Text style={{ color: '#000' }}>{discovery.error}</Text>
    </View>
  );
};

export default memo(Discovery);
