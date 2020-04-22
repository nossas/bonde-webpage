import React, { Fragment } from 'react';
import { InputField, TextareaField } from 'bonde-components';

type Props = {
  fields: Array<{
    label: string;
    name: string;
    placeholder: string;
    type?: string;
    validate?: any;
    onBlur?: any;
  }>;
};

const Fields = ({ fields }: Props) => {
  return (
    <Fragment>
      {fields.map(
        ({ name, label, type, placeholder, onBlur, ...configs }, i: number) => {
          if (type !== 'textarea')
            return (
              <InputField
                name={name}
                label={label}
                type={type}
                placeholder={placeholder}
                key={`input-id-${i}`}
                onBlur={onBlur}
                {...configs}
              />
            );
          return (
            <TextareaField
              label={label}
              name={name}
              placeholder={placeholder}
              key={`textarea-id-${i}`}
              onBlur={onBlur}
              {...configs}
            />
          );
        }
      )}
    </Fragment>
  );
};

export default Fields;
