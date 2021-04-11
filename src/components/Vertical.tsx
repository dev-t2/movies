import React, { FC, memo, useCallback } from 'react';
import { Pressable, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

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

interface IVertical {
  id: number;
  poster: string;
  title: string;
}

const Vertical: FC<IVertical> = ({ id, poster, title }) => {
  const navigation = useNavigation();

  const { width } = useWindowDimensions();

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
      </StyledContainer>
    </Pressable>
  );
};

export default memo(Vertical);
