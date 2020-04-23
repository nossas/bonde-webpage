import React from 'react';
import {
  CallAgain,
  CallCompleted,
  CallFailed,
  CallNextTarget,
  Calling,
  HowItWorks,
  FinishButton,
} from '../src/plugins/Pressure/Phone/components';
import PhonePressureProps from './mocks/plugin/pressure/phone';
import styled from 'styled-components';

const UnordedList = styled.ul`
  font-family: 'Source Sans Pro', 'Proxima Nova', sans-serif;
  font-size: 0.8rem;
  color: #333333;
  & li {
    text-transform: uppercase;
    display: grid;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    grid-template-columns: auto auto;
  }
`;

export const CallingTargetsComponents = () => {
  return (
    <>
      <UnordedList>
        <CallAgain
          name="Viviane"
          listKey={`call-again-${1}`}
          attempts={3}
          {...PhonePressureProps}
        />
        <br />
        <CallCompleted
          name="Camila"
          listKey={`call-again-${1}`}
          duration="37"
        />
        <br />
        <CallFailed name="Lucas" listKey={`call-again-${1}`} />
        <br />
        <CallNextTarget
          name="Viviane"
          listKey={`call-again-${1}`}
          {...PhonePressureProps}
        />
        <br />
        <Calling
          name="Lucas"
          listKey={`call-again-${1}`}
          status="in-progress"
        />
      </UnordedList>
      <HowItWorks />
      <br />
      <FinishButton buttonColor="#f1618c" {...PhonePressureProps} />
    </>
  );
};

export default {
  title: 'PhonePressure',
};
