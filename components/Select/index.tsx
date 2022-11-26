import * as React from 'react';
import styled from 'styled-components';

type Props = {
  className?: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  label?: string;
  value: string;
  children: React.ReactNode;
};

const Select = ({className, value, onChange, label, children}: Props) => {
  return (
    <Wrapper className={className}>
      {label ? <Label>{label}</Label> : null}
      <StyledSelect onChange={onChange} value={value}>
        {children}
      </StyledSelect>
    </Wrapper>
  );
};

export default Select;

const Wrapper = styled.label`
  display: block;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const Label = styled.span`
  display: block;
  margin-bottom: 0.25rem;
`;

const StyledSelect = styled.select`
  padding: 0.75em;
  font-size: 1em;
  border-radius: 0.15rem;
  border: 1px solid rgb(var(--color-gray));
`;
