import React, { FC, memo, useCallback, useMemo } from 'react';
import { Pressable, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

import { formatDate } from '../lib/date';
import Poster from './Poster';

interface IStyledContainer {
  width: number;
}

const StyledContainer = styled.View<IStyledContainer>(({ width }) => ({
  width: width / 4,
  height: '100%',
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

const StyledReleaseDate = styled.Text({
  color: '#fff',
  fontSize: 10,
  marginBottom: 8,
});

interface IVertical {
  id: number;
  poster: string;
  title: string;
  releaseDate: string;
}

const Vertical: FC<IVertical> = ({ id, poster, title, releaseDate }) => {
  const navigation = useNavigation();

  const { width } = useWindowDimensions();

  const formattedDate = useMemo(() => formatDate(releaseDate), [releaseDate]);

  const onPress = useCallback(() => {
    navigation.navigate('Details', { id, title });
  }, [navigation, id, title]);

  return (
    <Pressable onPress={onPress}>
      <StyledContainer width={width}>
        <StyledPosterContainer>
          <Poster poster={poster} />
        </StyledPosterContainer>

        <StyledTextContainer>
          <StyledTitle numberOfLines={1}>{title}</StyledTitle>
        </StyledTextContainer>

        <StyledTextContainer>
          <StyledReleaseDate>{formattedDate}</StyledReleaseDate>
        </StyledTextContainer>
      </StyledContainer>
    </Pressable>
  );
};

export default memo(Vertical);
