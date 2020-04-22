import React, { Fragment } from 'react';
import { InputField, TextareaField } from 'bonde-components';

type Props = {
  fields: Array<{
    label: string;
    name: string;
    placeholder: string;
    type?: string;
    validate?: any;
  }>;
};

const Fields = ({ fields }: Props) => {
  return (
    <Fragment>
      {fields.map(({ name, label, type, placeholder, ...configs }, i: any) => {
        if (type !== 'textarea')
          return (
            <InputField
              name={name}
              label={label}
              type={type}
              placeholder={placeholder}
              key={`input-id-${i}`}
              {...configs}
            />
          );
        return (
          <TextareaField
            label={label}
            name={name}
            placeholder={placeholder}
            key={`textarea-id-${i}`}
            {...configs}
          />
        );
      })}
    </Fragment>
  );
};

export default Fields;
