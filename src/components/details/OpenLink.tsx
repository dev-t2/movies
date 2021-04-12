import React, { FC, memo } from 'react';
import { GestureResponderEvent } from 'react-native';
import styled from 'styled-components/native';

interface IStyledContainer {
  isLast: boolean;
}

const StyledContainer = styled.Pressable<IStyledContainer>(({ isLast }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 8,
  marginBottom: isLast ? 0 : 8,
}));

const StyledText = styled.Text({
  color: '#fff',
  fontWeight: 'bold',
  opacity: 0.8,
});

interface IOpenLink {
  text?: string;
  isLast?: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

const OpenLink: FC<IOpenLink> = ({ text = '', isLast = false, onPress }) => {
  return (
    <StyledContainer isLast={isLast} onPress={onPress}>
      <StyledText numberOfLines={1}>{text}</StyledText>
    </StyledContainer>
  );
};

export default memo(OpenLink);
