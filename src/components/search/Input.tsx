import React, { FC, memo } from 'react';
import styled from 'styled-components/native';

const StyledTextInput = styled.TextInput({
  backgroundColor: '#fff',
  marginHorizontal: 16,
  marginBottom: 24,
  padding: '4px 24px',
  borderRadius: '16px',
});

interface IInput {
  value: string;
  placeholder: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
}

const Input: FC<IInput> = ({ value, placeholder, onChange, onSubmit }) => {
  return (
    <StyledTextInput
      value={value}
      placeholder={placeholder}
      returnKeyType="search"
      onChangeText={onChange}
      onSubmitEditing={onSubmit}
    />
  );
};

export default memo(Input);
