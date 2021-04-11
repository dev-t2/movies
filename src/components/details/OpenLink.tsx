import React, { FC, memo } from 'react';
import { GestureResponderEvent } from 'react-native';
import styled from 'styled-components/native';

const StyledContainer = styled.Pressable({
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 8,
  marginBottom: 8,
});

const StyledText = styled.Text({
  color: '#fff',
  fontWeight: 'bold',
  opacity: 0.8,
});

interface IOpenLink {
  text?: string;
  onPress: (event: GestureResponderEvent) => void;
}

const OpenLink: FC<IOpenLink> = ({ text = '', onPress }) => {
  return (
    <StyledContainer onPress={onPress}>
      <StyledText numberOfLines={1}>{text}</StyledText>
    </StyledContainer>
  );
};

export default memo(OpenLink);
