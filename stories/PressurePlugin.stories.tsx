import React from 'react';
import {
  PressureForm,
  EmailFields,
  PhoneBeforeStandardFields,
  CallingTargets,
} from '../src';
import PressureProps from './mocks/plugin/pressure';
import PhoneProps from './mocks/plugin/pressure/phone';

const renderFields = (
  pressureType: string,
  {
    Email,
    Phone,
  }: { Email?: React.ReactNode | null; Phone?: React.ReactNode | null }
) => {
  if (pressureType === 'email') return Email;
  if (pressureType === 'phone') return Phone;
  return <div>Invalid pressure type</div>;
};

export const EmailPressure = ({
  pressureType = 'email',
  targetList = PressureProps.targetList,
  disableSubjectAndBody = true,
}) => {
  return (
    <PressureForm
      {...PressureProps}
      BeforeStandardFields={() =>
        renderFields(pressureType, {
          Email: EmailFields.before(targetList),
          Phone: <div>Phone</div>,
        })
      }
      AfterStandardFields={() =>
        renderFields(pressureType, {
          Email: EmailFields.after(disableSubjectAndBody),
          Phone: null,
        })
      }
    />
  );
};

// Phone: PhoneFields.after({
//   buttonColor,
//   callManagement,
//   addTwilioCallMutation,
//   toggleFinishMessage,
// }),
// buttonColor = '',
// callManagement = [],
// addTwilioCallMutation = PhoneProps.addTwilioCallMutation,
// toggleFinishMessage = PhoneProps.toggleFinishMessage,

export const PhonePressure = ({
  targetList = PhoneProps.targetList,
  pressureType = 'phone',
}) => {
  return (
    <PressureForm
      {...PressureProps}
      BeforeStandardFields={() =>
        renderFields(pressureType, {
          Email: <div>Antes e-mail</div>,
          Phone: <PhoneBeforeStandardFields targetList={targetList} />,
        })
      }
      AfterStandardFields={() =>
        renderFields(pressureType, {
          Email: <div>Depois e-mail</div>,
          Phone: null,
        })
      }
    />
  );
};

export default {
  title: 'PressurePlugin',
};
