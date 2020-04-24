import React, { Fragment } from 'react';
import { InputField, TextareaField } from 'bonde-components';
import { WrapInputs } from './styles';

type Props = {
  fields: Array<{
    label: string;
    name: string;
    placeholder: string;
    type?: string;
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
          { name, label, type, placeholder, onBlur, disabled, ...configs },
          i: number
        ) => {
          if (type !== 'textarea')
            return (
              <WrapInputs disabled={disabled}>
                <InputField
                  name={name}
                  label={label}
                  type={type}
                  placeholder={placeholder}
                  key={`input-id-${i}`}
                  onBlur={onBlur}
                  disabled={disabled}
                  {...configs}
                />
              </WrapInputs>
            );
          return (
            <WrapInputs disabled={disabled}>
              <TextareaField
                label={label}
                name={name}
                placeholder={placeholder}
                key={`textarea-id-${i}`}
                onBlur={onBlur}
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
