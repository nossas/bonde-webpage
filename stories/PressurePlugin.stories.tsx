import React from 'react';
import { PressureForm, EmailFields } from '../src';
import PressureProps from './mocks/plugin/pressure';

const renderFields = (type: string, { Email, Phone }) => {
  if (type === 'email') return Email;
  if (type === 'phone') return Phone;
  return <div>Invalid pressure type</div>;
};

export const Form = () => {
  return (
    <PressureForm
      {...PressureProps}
      BeforeStandardFields={() =>
        renderFields('email', {
          Email: EmailFields.before([]),
          Phone: <div>Phone</div>,
        })
      }
      AfterStandardFields={() =>
        renderFields('email', {
          Email: EmailFields.after(),
          Phone: <div>Phone</div>,
        })
      }
    />
  );
};

export default {
  title: 'PressurePlugin',
};
