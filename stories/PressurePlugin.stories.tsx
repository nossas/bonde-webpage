import React from 'react';
import {
  PressureForm,
  EmailFields,
  PhoneFields,
  Targets,
  Count,
  PressurePlugin,
} from '../src';
import PressureProps from './mocks/plugin/pressure';
import PhoneProps from './mocks/plugin/pressure/phone';
import EmailProps from './mocks/plugin/pressure/email';

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

export const EmailPressureForm = ({
  pressureType = 'email',
  targetList = PressureProps.targetList,
  disableSubjectAndBody = false,
}) => {
  return (
    <PressureForm
      {...PressureProps}
      saving={false}
      initialValues={{
        subject: 'Assunto',
        body: 'blablabla',
      }}
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

export const PhonePressureForm = ({
  targetList = PhoneProps.targetList,
  pressureType = 'phone',
}) => {
  return (
    <PressureForm
      {...PressureProps}
      saving={false}
      BeforeStandardFields={() =>
        renderFields(pressureType, {
          Email: <div>Antes e-mail</div>,
          Phone: PhoneFields.before(targetList),
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

export const TargetList = () => {
  return <Targets targets={PressureProps.targetList} pressureType={'email'} />;
};

export const CountContainer = () => {
  return (
    <Count
      value={PressureProps.widget.count || 0}
      color={PressureProps.widget.settings.main_color}
      text={'pressões'}
      startCounting={true}
    />
  );
};

export const PhoneWithoutCallTransition = () => {
  return (
    <PressurePlugin
      {...PhoneProps}
      twilioCall={() => console.log('twilioCall')}
      countTwilioCallsByWidget={async () => ({ phonePressureCount: 6 })}
      saving={false}
      asyncFillWidget={() => console.log('asyncFillWidget')}
      filledPressureWidgets={[]}
      callTransition={undefined}
    />
  );
};

export const PhoneWithCallTransition = () => {
  return (
    <PressurePlugin
      {...PhoneProps}
      twilioCall={() => console.log('twilioCall')}
      countTwilioCallsByWidget={async () => ({ phonePressureCount: 6 })}
      saving={false}
      asyncFillWidget={() => console.log('asyncFillWidget')}
      filledPressureWidgets={[]}
    />
  );
};

export const EmailPressure = () => {
  return (
    <PressurePlugin
      {...EmailProps}
      twilioCall={() => console.log('twilioCall')}
      countTwilioCallsByWidget={async () => ({ phonePressureCount: 15 })}
      saving={false}
      asyncFillWidget={() => console.log('asyncFillWidget')}
      filledPressureWidgets={[]}
      callTransition={undefined}
    />
  );
};

export default {
  title: 'PressurePlugin',
};
