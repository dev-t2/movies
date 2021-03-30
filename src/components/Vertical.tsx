import React, { FC, memo } from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';

import Poster from './Poster';
import Vote from './Vote';

interface IStyledContainer {
  width: number;
  height: number;
}

const StyledContainer = styled.View<IStyledContainer>(({ width, height }) => ({
  width: width / 4,
  height: height / 4,
  marginLeft: 16,
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
  const { width, height } = useWindowDimensions();

  return (
    <StyledContainer width={width} height={height}>
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
