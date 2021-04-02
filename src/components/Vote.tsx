import React, { FC, memo, useMemo } from 'react';
import styled from 'styled-components/native';

const StyledText = styled.Text({
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 10,
});

interface IVote {
  vote: number;
}

const Vote: FC<IVote> = ({ vote }) => {
  const fixedVote = useMemo(() => vote.toFixed(1), [vote]);

  return <StyledText>⭐ {fixedVote} / 10.0</StyledText>;
};

export default memo(Vote);
