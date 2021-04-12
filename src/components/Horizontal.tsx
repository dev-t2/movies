import React, { FC, memo, useCallback } from 'react';
import { Pressable, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

import Poster from './Poster';
import Vote from './Vote';

interface IStyledContainer {
  height: number;
}

const StyledContainer = styled.View<IStyledContainer>(({ height }) => ({
  width: '100%',
  height: height / 5,
  flexDirection: 'row',
  marginLeft: 16,
  marginBottom: 12,
}));

interface IStyledPosterContainer {
  width: number;
}

const StyledPosterContainer = styled.View<IStyledPosterContainer>(
  ({ width }) => ({
    width: width / 3.8,
    marginRight: 16,
  })
);

const StyledInfoContainer = styled.View({
  width: '60%',
  paddingTop: 4,
});

const StyledTitle = styled.Text({
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
});

const StyledVoteContainer = styled.View({
  marginBottom: 8,
});

const StyledOverview = styled.Text({
  color: '#fff',
  opacity: 0.8,
});

interface IHorizontal {
  id: number;
  poster: string;
  title: string;
  vote: number;
  overview: string;
}

const Horizontal: FC<IHorizontal> = ({ id, poster, title, vote, overview }) => {
  const navigation = useNavigation();

  const { width, height } = useWindowDimensions();

  const onPress = useCallback(() => {
    navigation.navigate('Details', { id, title });
  }, [navigation, id, title]);

  return (
    <Pressable onPress={onPress}>
      <StyledContainer height={height}>
        <StyledPosterContainer width={width}>
          <Poster poster={poster} />
        </StyledPosterContainer>

        <StyledInfoContainer>
          <StyledTitle numberOfLines={1}>{title}</StyledTitle>

          <StyledVoteContainer>
            <Vote vote={vote} />
          </StyledVoteContainer>

          <StyledOverview numberOfLines={4}>{overview}</StyledOverview>
        </StyledInfoContainer>
      </StyledContainer>
    </Pressable>
  );
};

export default memo(Horizontal);
