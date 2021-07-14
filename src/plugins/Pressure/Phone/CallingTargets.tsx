import React from 'react';
import {
  CallAgain,
  CallCompleted,
  CallFailed,
  CallNextTarget,
  Calling,
  HowItWorks,
  FinishButton,
} from './components';
import styled from '@emotion/styled';

const UnordedList = styled.ul`
  font-family: inherit;
  list-style: none;
  padding: 0;
  font-size: 0.8rem;
  margin: 0 0 0.8rem;
`;

const PhoneCalls = styled.div`
  background-color: #fff;
`;

type AfterProps = {
  addTwilioCallMutation: any;
  buttonColor: string;
  toggleFinishMessage: any;
  callManagement: Array<{
    name: string;
    value: string;
    attempts: number;
    twilioCallTo: string;
    twilioCallTransitionStatus: string;
    twilioCallTransitionCallDuration: string;
  }>;
};

const CallingTargets = ({
  addTwilioCallMutation,
  buttonColor,
  toggleFinishMessage,
  callManagement,
}: AfterProps) => {
  console.log("addTwilioCallMutation, buttonColor, toggleFinishMessage, callManagement", {
    addTwilioCallMutation,
    buttonColor,
    toggleFinishMessage,
    callManagement
  });
  return (
    <PhoneCalls>
      <UnordedList>
        {callManagement.map((target, i: number) => {
          const {
            name,
            value,
            attempts,
            twilioCallTo: to,
            twilioCallTransitionStatus: status,
            twilioCallTransitionCallDuration: duration,
          } = target;

          const componentKey = `target-phone-${i}`;

          if (to === value) {
            if (status === 'completed') {
              return (
                <CallCompleted
                  listKey={componentKey}
                  name={name}
                  duration={duration}
                />
              );
            } else if (
              ['initiated', 'ringing', 'in-progress'].includes(status)
            ) {
              return (
                <Calling status={status} listKey={componentKey} name={name} />
              );
            } else if (['busy', 'failed', 'no-answer'].includes(status)) {
              if (attempts < 0)
                return (
                  <CallAgain
                    listKey={componentKey}
                    name={name}
                    attempts={attempts}
                    addTwilioCallMutation={addTwilioCallMutation}
                  />
                );
              return <CallFailed listKey={componentKey} name={name} />;
            }
          }
          return (
            <CallNextTarget
              listKey={componentKey}
              name={name}
              addTwilioCallMutation={addTwilioCallMutation}
            />
          );
        })}
      </UnordedList>
      <HowItWorks />
      <FinishButton
        buttonColor={buttonColor}
        toggleFinishMessage={toggleFinishMessage}
      />
    </PhoneCalls>
  );
};

export default CallingTargets;
