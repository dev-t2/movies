import React, { FC, memo, ReactNode } from 'react';
import styled from 'styled-components/native';

import Title from './Title';

const StyledTitleContainer = styled.View({
  marginBottom: 12,
});

interface IList {
  children: ReactNode;
  title: string;
}

const List: FC<IList> = ({ children, title }) => {
  return (
    <>
      <StyledTitleContainer>
        <Title title={title} />
      </StyledTitleContainer>

      {children}
    </>
  );
};

export default memo(List);
