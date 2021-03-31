import React, { FC, memo, useMemo } from 'react';
import styled from 'styled-components/native';

import { getImageUri } from '../lib/api';

const StyledImage = styled.Image({
  flex: 1,
  borderRadius: 4,
});

interface IPoster {
  poster: string;
}

const Poster: FC<IPoster> = ({ poster }) => {
  const source = useMemo(() => ({ uri: getImageUri(poster) }), [poster]);

  return <StyledImage source={source} />;
};

export default memo(Poster);
