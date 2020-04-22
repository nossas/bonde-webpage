import React from 'react';
import { PressureForm, EmailFields, PhoneFields } from '../src';
import PressureProps from './mocks/plugin/pressure';

const renderFields = (type: string, { Email, Phone }) => {
  if (type === 'email') return Email;
  if (type === 'phone') return Phone;
  return <div>Invalid pressure type</div>;
};

export const EmailPressure = (pressureType: string) => {
  return (
    <PressureForm
      {...PressureProps}
      BeforeStandardFields={() =>
        renderFields(pressureType, {
          Email: EmailFields.before([]),
          Phone: <div>Phone</div>,
        })
      }
      AfterStandardFields={() =>
        renderFields('email', {
          Email: EmailFields.after(),
          Phone: undefined,
        })
      }
    />
  );
};

export const PhonePressure = () => {
  return (
    <PressureForm
      {...PressureProps}
      BeforeStandardFields={() =>
        renderFields('phone', {
          Email: <div>Antes e-mail</div>,
          Phone: PhoneFields.before([]),
        })
      }
      AfterStandardFields={() => <div>Depois telefone</div>}
    />
  );
};

export default {
  title: 'PressurePlugin',
};
