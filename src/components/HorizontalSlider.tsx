import React, { FC, memo, ReactNode } from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';

import Title from './Title';

const StyledTitleContainer = styled.View({
  marginBottom: 16,
});

interface IStyledVerticalContainer {
  height: number;
}

const StyledVerticalContainer = styled.View<IStyledVerticalContainer>(
  ({ height }) => ({
    width: '100%',
    height: height / 4,
    marginBottom: 32,
  })
);

const StyledVertical = styled.ScrollView({
  marginLeft: 16,
});

interface IHorizontalSlider {
  children: ReactNode;
  title: string;
}

const HorizontalSlider: FC<IHorizontalSlider> = ({ children, title }) => {
  const { height } = useWindowDimensions();

  return (
    <>
      <StyledTitleContainer>
        <Title title={title} />
      </StyledTitleContainer>

      <StyledVerticalContainer height={height}>
        <StyledVertical horizontal showsHorizontalScrollIndicator={false}>
          {children}
        </StyledVertical>
      </StyledVerticalContainer>
    </>
  );
};

export default memo(HorizontalSlider);
