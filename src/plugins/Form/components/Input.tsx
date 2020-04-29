import React from 'react';
import styled from 'styled-components';
import theme from '../../../base/theme';

const Select = styled.select`
  border-radius: 2px;
  padding: 1rem;
  display: inline-block;
  height: inherit;
  background-color: #ffffff;
  box-sizing: border-box;
  border: 1px solid #eee;
  font-family: inherit;
  font-size: inherit;
  width: 100%;
`;

const StyledInput = styled.input`
  cursor: pointer;
  border-radius: 2px;
  padding: 1rem;
  box-sizing: border-box;
  height: auto;
  border: 1px solid #eee;
  font-size: inherit;
  font-family: inherit;
  width: 100%;
`;

const Label = styled.label`
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0;
  text-transform: uppercase;
  color: #fff;
`;

type Props = {
  name: string;
  onChange: any;
  onBlur: any;
  field: {
    kind: string;
    placeholder: string;
    label: string;
    required: string;
  };
  bodyFont: string;
};

const renderFieldKind = ({
  field,
  name,
  onChange,
  onBlur,
}: Omit<Props, 'bodyFont'>) => {
  if (field.kind === 'dropdown') {
    return (
      <Select
        name={name}
        className="select block border border-gray94"
        onChange={onChange}
      >
        <option value="">{'Selecione...'}</option>
        {field.placeholder.split(',').map(function(v: any, index: number) {
          return (
            <option value={v} key={`dropdown-option-${index}`}>
              {v}
            </option>
          );
        })}
      </Select>
    );
  }
  return (
    <StyledInput
      name={name}
      type={field.kind === 'email' ? 'email' : 'text'}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={field.placeholder}
      className="input block border border-gray94"
    />
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: 1rem;
  font-family: inherit;
`;

const Input = ({ field, bodyFont, ...props }: Props) => {
  return (
    <Wrapper style={{ fontFamily: bodyFont }}>
      <Label className="caps bold mb1 inline-block white">
        {field.label}
        {field.required === 'true' ? '*' : null}
      </Label>
      {renderFieldKind({ ...props, field })}
    </Wrapper>
  );
};

Input.defaultProps = {
  bodyFont: theme.fontFamily,
};

export default Input;
