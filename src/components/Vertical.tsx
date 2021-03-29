import React, { FC, memo } from 'react';
import styled from 'styled-components/native';

import Poster from './Poster';
import Vote from './Vote';

const StyledContainer = styled.View({});

const StyledTitle = styled.Text({
  color: '#fff',
});

const StyledVoteContainer = styled.View({});

interface IVertical {
  poster: string;
  title: string;
  vote: number;
}

const Vertical: FC<IVertical> = ({ poster, title, vote }) => {
  return (
    <StyledContainer>
      <Poster poster={poster} />

      <StyledTitle>{title}</StyledTitle>

      <StyledVoteContainer>
        <Vote vote={vote} />
      </StyledVoteContainer>
    </StyledContainer>
  );
};

export default memo(Vertical);
