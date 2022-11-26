import * as React from 'react';
import styled from 'styled-components';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label?: string;
} & (
    | {
        type?: 'text';
        value: string;
      }
    | {
        type: 'number';
        value: number | '';
      }
  );

const Input = ({className, value, onChange, label, type = 'text', ...props}: Props) => {
  return (
    <Wrapper className={className}>
      {label ? <Label>{label}</Label> : null}
      <StyledInput {...props} type={type} onChange={onChange} value={value} />
    </Wrapper>
  );
};

export default Input;

const Wrapper = styled.label`
  display: block;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const Label = styled.span`
  display: block;
  margin-bottom: 0.25rem;
`;

const StyledInput = styled.input`
  padding: 0.75em;
  font-size: 1em;
  border-radius: 0.15rem;
  border: 1px solid rgb(var(--color-gray));
`;
