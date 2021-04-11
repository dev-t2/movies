import React, { FC, memo } from 'react';
import { GestureResponderEvent, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';

const StyledContainer = styled.Pressable({
  flexDirection: 'row',
  alignItems: 'center',
  paddingLeft: 4,
  paddingRight: 40,
  marginBottom: 4,
});

const StyledIcon = styled(Ionicons)({
  marginRight: 8,
});

const StyledText = styled.Text({
  color: '#fff',
  fontWeight: 'bold',
});

interface IOpenLink {
  icon: string;
  text?: string;
  onPress: (event: GestureResponderEvent) => void;
}

const IS_APPLE_PLATFORM = Platform.OS === 'ios' || Platform.OS === 'macos';

const OpenLink: FC<IOpenLink> = ({ icon, text = '', onPress }) => {
  return (
    <StyledContainer onPress={onPress}>
      <StyledIcon
        name={IS_APPLE_PLATFORM ? `ios-logo-${icon}` : `md-logo-${icon}`}
        color="#fff"
        size={24}
      />
      <StyledText numberOfLines={1}>{text}</StyledText>
    </StyledContainer>
  );
};

export default memo(OpenLink);
