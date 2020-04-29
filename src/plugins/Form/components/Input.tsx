import React from 'react';
import styled from 'styled-components';
import theme from '../../../base/theme';

const Select = styled.select`
  border-radius: 2px;
  padding: 1rem;
  display: inline-block;
  height: inherit;
`;

const StyledInput = styled.input`
  border-radius: 2px;
  padding: 1rem;
`;

const Label = styled.label`
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
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

const Input = ({ field, bodyFont, ...props }: Props) => {
  return (
    <div className="mb2" style={{ fontFamily: bodyFont }}>
      <Label className="caps bold mb1 inline-block white">
        {field.label}
        {field.required === 'true' ? '*' : null}
      </Label>
      {renderFieldKind({ ...props, field })}
    </div>
  );
};

Input.defaultProps = {
  bodyFont: theme.fontFamily,
};

export default Input;
