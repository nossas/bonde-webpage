import React, { Fragment } from 'react';

import { InputField, TextareaField } from 'bonde-components';

import { WrapInputs } from './styles';

type Props = {
  fields: Array<{
    label: string;
    name: string;
    placeholder: string;
    type: string;
    validate?: any;
    onBlur?: any;
    disabled: boolean;
  }>;
};

const Fields = ({ fields }: Props) => {
  return (
    <Fragment>
      {fields.map(
        (
          { name, label, type, placeholder, disabled, onBlur, ...configs },
          i: number
        ) => {
          if (type !== 'textarea')
            return (
              <WrapInputs key={`input-id-${i}`} disabled={disabled}>
                <InputField
                  name={name}
                  label={label}
                  type={type}
                  placeholder={placeholder}
                  disabled={disabled}
                  onBlur={onBlur}
                  {...configs}
                />
              </WrapInputs>
            );
          return (
            <WrapInputs key={`textarea-id-${i}`} disabled={disabled}>
              <TextareaField
                label={label}
                name={name}
                placeholder={placeholder}
                disabled={disabled}
                {...configs}
              />
            </WrapInputs>
          );
        }
      )}
    </Fragment>
  );
};

export default Fields;
