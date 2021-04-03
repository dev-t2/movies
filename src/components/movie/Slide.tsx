import React, { FC, memo, useMemo } from 'react';
import styled from 'styled-components/native';

import { Poster, Vote } from '../../components';
import { getImageUri } from '../../lib/api';

const StyledContainer = styled.View(() => ({
  flex: 1,
}));

const StyledBackdropImage = styled.Image({
  width: '100%',
  height: '100%',
  opacity: 0.4,
  position: 'absolute',
});

const StyledContents = styled.View({
  height: '100%',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
});

const StyledPosterContainer = styled.View({
  width: '28%',
  height: '92%',
});

const StyledInfo = styled.View({
  width: '50%',
  alignItems: 'flex-start',
});

const StyledTitle = styled.Text({
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 20,
});

const StyledVoteContainer = styled.View({
  marginBottom: 8,
});

const StyledOverview = styled.Text({
  color: '#fff',
  fontWeight: 'bold',
  marginBottom: 12,
});

const StyledPressable = styled.Pressable({
  backgroundColor: '#e35656',
  padding: '4px 12px',
  borderRadius: 4,
});

const StyledButtonText = styled.Text({
  color: '#fff',
});

interface ISlide {
  id: number;
  backdropImage: string;
  poster: string;
  title: string;
  vote: number;
  overview: string;
}

const Slide: FC<ISlide> = ({
  backdropImage,
  poster,
  title,
  vote,
  overview,
}) => {
  const source = useMemo(() => ({ uri: getImageUri(backdropImage) }), [
    backdropImage,
  ]);

  return (
    <StyledContainer>
      <StyledBackdropImage source={source} />

      <StyledContents>
        <StyledPosterContainer>
          <Poster poster={poster} />
        </StyledPosterContainer>

        <StyledInfo>
          <StyledTitle numberOfLines={1}>{title}</StyledTitle>

          <StyledVoteContainer>
            <Vote vote={vote} />
          </StyledVoteContainer>

          <StyledOverview numberOfLines={4}>{overview}</StyledOverview>

          <StyledPressable>
            <StyledButtonText>더보기</StyledButtonText>
          </StyledPressable>
        </StyledInfo>
      </StyledContents>
    </StyledContainer>
  );
};

export default memo(Slide);