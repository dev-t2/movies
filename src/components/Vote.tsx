import React, { FC, memo } from 'react';
import styled from 'styled-components/native';

const StyledText = styled.Text({
  color: '#fff',
  fontWeight: 'bold',
});

interface IVote {
  vote: number;
}

const Vote: FC<IVote> = ({ vote }) => {
  return <StyledText>⭐ {vote} / 10</StyledText>;
};

export default memo(Vote);
