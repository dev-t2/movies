import React, { FC, memo } from 'react';
import { Pressable, useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';

import Poster from './Poster';

interface IStyledContainer {
  height: number;
}

const StyledContainer = styled.View<IStyledContainer>(({ height }) => ({
  width: '100%',
  height: height / 5,
  flexDirection: 'row',
  marginLeft: 16,
  marginBottom: 16,
}));

interface IStyledPosterContainer {
  width: number;
}

const StyledPosterContainer = styled.View<IStyledPosterContainer>(
  ({ width }) => ({
    width: width / 4,
    marginRight: 16,
  })
);

const StyledInfoContainer = styled.View({
  width: '62%',
});

const StyledTitle = styled.Text({
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
});

const StyledReleaseDate = styled.Text({
  color: '#fff',
  fontSize: 12,
  marginBottom: 8,
});

const StyledOverview = styled.Text({
  color: '#fff',
});

interface IHorizontal {
  id: number;
  poster: string;
  title: string;
  releaseDate?: string;
  overview: string;
}

const Horizontal: FC<IHorizontal> = ({
  poster,
  title,
  releaseDate,
  overview,
}) => {
  const { width, height } = useWindowDimensions();

  return (
    <Pressable>
      <StyledContainer height={height}>
        <StyledPosterContainer width={width}>
          <Poster poster={poster} />
        </StyledPosterContainer>

        <StyledInfoContainer>
          <StyledTitle numberOfLines={1}>{title}</StyledTitle>
          {releaseDate && <StyledReleaseDate>{releaseDate}</StyledReleaseDate>}
          <StyledOverview numberOfLines={5}>{overview}</StyledOverview>
        </StyledInfoContainer>
      </StyledContainer>
    </Pressable>
  );
};

export default memo(Horizontal);
