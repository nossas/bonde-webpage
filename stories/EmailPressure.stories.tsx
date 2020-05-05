import React from 'react';
import {
  PressureForm,
  EmailPressurePlugin,
  PressurePlugin,
  EmailFields,
} from '../src';
import PressureProps from './mocks/plugin/pressure';
import EmailProps from './mocks/plugin/pressure/email';

export const EmailPressureForm = ({
  targetList = PressureProps.targetList,
  disableSubjectAndBody = false,
}) => {
  return (
    <PressureForm
      {...PressureProps}
      saving={false}
      BeforeStandardFields={() => EmailFields.before(targetList)}
      AfterStandardFields={() => EmailFields.after(disableSubjectAndBody)}
    />
  );
};

export const EmailPressure = () => {
  return (
    <PressurePlugin
      {...EmailProps}
      PluginComponent={EmailPressurePlugin}
      fillWidget={async () => true}
      overrides={{
        FinishCustomMessage: { component: null, props: {} },
        FinishDefaultMessage: {
          component: <div>compartilhe!</div>,
          props: { imageUrl: 'bla', href: 'https://www.mapalgbt.bonde.org' },
        },
      }}
    />
  );
};

export default {
  title: 'PressurePlugin',
};
