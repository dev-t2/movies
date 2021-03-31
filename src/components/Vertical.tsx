import React, { FC, memo } from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';

import Poster from './Poster';
import Vote from './Vote';

interface IStyledContainer {
  width: number;
}

const StyledContainer = styled.View<IStyledContainer>(({ width }) => ({
  width: width / 4,
  marginRight: 8,
}));

const StyledPosterContainer = styled.View({
  flex: 1,
  marginBottom: 4,
});

const StyledTextContainer = styled.View({
  alignItems: 'center',
});

const StyledTitle = styled.Text({
  color: '#fff',
  fontWeight: 'bold',
});

const StyledVoteContainer = styled.View({
  alignItems: 'center',
});

interface IVertical {
  poster: string;
  title: string;
  vote: number;
}

const Vertical: FC<IVertical> = ({ poster, title, vote }) => {
  const { width } = useWindowDimensions();

  return (
    <StyledContainer width={width}>
      <StyledPosterContainer>
        <Poster poster={poster} />
      </StyledPosterContainer>

      <StyledTextContainer>
        <StyledTitle numberOfLines={1}>{title}</StyledTitle>
      </StyledTextContainer>

      <StyledVoteContainer>
        <Vote vote={vote} />
      </StyledVoteContainer>
    </StyledContainer>
  );
};

export default memo(Vertical);
