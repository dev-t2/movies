import React, { FC, memo, ReactNode } from 'react';
import { useWindowDimensions } from 'react-native';
import Swiper from 'react-native-web-swiper';
import styled from 'styled-components/native';

interface IStyledSwiperContainer {
  height: number;
}

const StyledSwiperContainer = styled.View<IStyledSwiperContainer>(
  ({ height }) => ({
    width: '100%',
    height: height / 4,
    marginBottom: 32,
  })
);

interface IHorizontalSwiper {
  children: ReactNode;
}

const HorizontalSwiper: FC<IHorizontalSwiper> = ({ children }) => {
  const { height } = useWindowDimensions();

  return (
    <StyledSwiperContainer height={height}>
      <Swiper controlsEnabled={false} loop timeout={4}>
        {children}
      </Swiper>
    </StyledSwiperContainer>
  );
};

export default memo(HorizontalSwiper);
