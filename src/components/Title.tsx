import React, { FC, memo } from 'react';
import styled from 'styled-components/native';

const StyledTitle = styled.Text({
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 18,
  marginLeft: 16,
});

interface ITitle {
  title: string;
}

const Title: FC<ITitle> = ({ title }) => {
  return <StyledTitle>{title}</StyledTitle>;
};

export default memo(Title);
