import React from 'react';
import {
  PressureForm,
  // BeforeStandardFields,
  Fields,
} from '../src';

import PressureProps from './mocks/plugin/pressure';

const checkTargetsList = (message: string, targetList: Array<any>) => (
  value: string
) =>
  targetList.some(target => target.match(`<${value}>`)) ? message : undefined;

const beforeStandardFields = (type: string) => {
  // const { required, isEmail, composeValidators } = Validators;

  if (type === 'email') return <Fields fields={['bla', 'bla', 'bla']} />;

  if (type === 'phone') return <div>Phone</div>;

  return <div>Invalid pressure type</div>;
};

export const Form = () => {
  <PressureForm
    {...PressureProps}
    BeforeStandardFields={() => beforeStandardFields('email')}
    AfterStandardFields={() => <div>Depois</div>}
  />;
};

export default {
  title: 'PressurePlugi',
};
