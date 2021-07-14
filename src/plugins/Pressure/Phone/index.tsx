import React, { useState, useEffect } from 'react';
import styled from "@emotion/styled";
import {
  Count,
  Form,
  Targets
} from '../components';
import PhoneFields from './PhoneFields';
import CallingTargets from './CallingTargets';

import { Header } from '../styles';
import {
  parseTarget,
  getEmailTarget,
  arrayUtils,
  getTargetList
} from '../utils';

const PhoneFormStyled = styled.div`
  .pressure-form {
    overflow: hidden;
    position: relative;
    background-color: #FFFFFF;

    & > div {
      transition: left .5s ease;
    }

    .activist-form {
      position: relative;
      width: 100%;
      left: 0;
    }

    .phone-calls {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 100%;
      overflow-y: auto;
    }

    &.is-calling {
      .activist-form { left: -100%; }
      .phone-calls { left: 0; }
    }

    .form-group {
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;

      label, input, textarea {
        font-size: .9rem;
      }
    }
  }

  .phone-calls {
    color: #333333;
    background-color: #FFFFFF;

    .heading {
      font-size: .85rem;
      text-transform: uppercase;
      margin: 1.5rem;
    }

    ul {
      list-style: none;
      padding: 0;
      font-size: .8rem;
      margin: 0 0 .8rem;
    }

    ul li {
      text-transform: uppercase;
      padding: 1.7rem 1.5rem;
      padding-right: .8rem;
    }

    ul li.success { background-color: #00C08A; }
    ul li.warning { background-color: #FFD500; }
    ul li.primary { background-color: #40B4E5; }
    ul li.danger { background-color: #C20000; }

    ul li .flex-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    ul li .fa-phone-square,
    ul li .fa-phone {
      font-size: 2.4rem;
      margin-right: 1rem;
      position: relative;
      top: 1px;
    }

    ul li .fa-phone-square { color: #333333; }
    ul li .fa-phone { color: #333333; }

    ul li .call-item {
      display: flex;
    }

    .call-status-message {
      margin-left: 20px;
    }

    .call-status-message.success{ color: #00C08A; }
    .call-status-message.warning{ color: #FFD500; }
    .call-status-message.primary{ color: #40B4E5; }
    .call-status-message.danger{ color: #DD2295; }

    .btn-call {
      border: none;
      color: #FFFFFF;
      background-color: transparent;
      border-radius: 2px;
      text-transform: uppercase;
      padding: .8rem 1rem;
      margin-left: 1rem;
      cursor: pointer;
      outline: none;
    }

    .btn-call.calling {
      background-color: #222;
    }

    .btn-call.primary {
      background-color: #40B4E5;
    }

    .btn-call.outlined {
      border: 1px solid #333333;
      color: #333333;
      padding: calc(.8rem - 1px) calc(1rem - 1px);
    }

    .btn-call.full-width {
      width: 100%;
      margin: 0;
    }

    ul li .finish {
      display: flex;
      flex-direction: row;
      text-transform: none;
      justify-content: center;
      text-align: center;
      align-items: center;
    }

    ul li .fa-check-circle {
      font-size: 1.8rem;
      margin-left: .5rem;
    }

    ul li .fa-times-circle {
      font-size: 1.8rem;
      margin-left: .5rem;
    }

    ul li .inline-container {
      display: flex;
      text-transform: none;
      text-align: right;
      align-items: center;
    }

    ul li .inline-container .prefix {
      margin-right: .3rem;
    }

    ul li .inline-container .btn-call {
      margin: 0;
    }

    .target-name {
      display: flex;
      align-items: center;
    }

    .target-name-two {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
    }

    .how-it-works {
      padding: 0 1.5rem;
      font-size: .8rem;
      text-transform: uppercase;
    }

    .how-it-works > ol {
      text-align: left;
      padding-left: 1.5rem;
      font-size: .8rem;
      text-transform: none;
      margin-top: .5rem;
    }

    .how-it-works > ol > li {
      margin-bottom: .4rem;
    }

    .caption {
      font-size: .7rem;
      font-weight: 300;
      text-transform: uppercase;
      margin: 1rem 0;
      display: flex;
      flex-wrap: wrap;
    }

    .caption .item {
      padding-left: 1.5rem;
      position: relative;
      display: flex;
      align-items: center;
      width: calc(50% - 1.5rem);
    }

    .caption .bullet {
      content: '';
      border-radius: 50%;
      width: 6px;
      height: 6px;
      margin-right: 1rem;
      background-color: #FFFFFF;
    }
    .caption .bullet.primary { background-color: #40B4E5; }
    .caption .bullet.success { background-color: #00C08A; }
    .caption .bullet.warning { background-color: #FFD500; }
    .caption .bullet.danger { background-color: #DD2295; }
  }

  @-webkit-keyframes ring {
    0%  { transform: rotate(-30deg); }
    3%  { transform: rotate(30deg); }
    6%  { transform: rotate(-30deg); }
    9%  { transform: rotate(30deg); }
    12% { transform: rotate(-30deg); }
    15% { transform: rotate(30deg); }
    18% { transform: rotate(-30deg); }
    21% { transform: rotate(30deg); }
    24% { transform: rotate(0deg); }
  }
  .ring {
    animation: ring 1s linear infinite alternate;
  }
`;

/* TODO: Change static content by props
 * - title
 * - bgColor
 */

type Props = {
  /* Below props are from root parent */
  editable?: boolean;
  mobilization: {
    header_font?: string;
    community_id?: string | number;
  };
  widget: {
    id: number;
    count?: number;
    settings: {
      main_color: string;
      call_to_action?: string;
      title_text: string;
      button_text: string;
      pressure_subject: string;
      pressure_body: string;
      disable_edit_field?: any;
      finish_message_type?: string;
      finish_message?: Record<any, any>;
      finish_message_background?: string;
      targets: string;
      count_text?: string;
      show_city?: string;
      pressure_type: string | 'unique' | 'group';
    };
  };
  block: {
    scrollTopReached?: any;
  };
  overrides: {
    FinishCustomMessage: {
      component?: any;
      props: any;
    };
    FinishDefaultMessage: {
      component?: any;
      props: any;
    };
  };
  analyticsEvents: {
    pressureIsFilled: () => void;
  };
  twilio: {
    call: any;
    observableQuery?: any;
    phonePressureCount: number;
    callTransition?: any;
  }
};

// const countTwilioCallsByWidget = (variables: any) => {
// return graphqlClient
//   .query({
//     query: graphqlQueries.countTwilioCallsByWidget,
//     variables,
//   })
//   .then(
//     ({
//       data: {
//         allTwilioCalls: { totalCount: phonePressureCount },
//       },
//     }: any) => {
//       return Promise.resolve({ phonePressureCount });
//     }
//   );
// return variables;
// };

const PhonePressure = ({
  analyticsEvents,
  widget,
  mobilization,
  block,
  overrides,
  twilio
}: Props) => {
  const [targetsError, setTargetsError] = useState<Array<string>>([]);
  const [showFinishMessage, toggleFinishMessage] = useState(false);
  const [callManagement, setCalls] = useState<any[]>([]);

  const { call, phonePressureCount, callTransition } = twilio;

  const {
    main_color: mainColor,
    call_to_action: callToAction,
    title_text: titleText,
    // Maybe `reply_email` is necessary...
    // reply_email,
    count_text: countText,
    finish_message_type: finishMessageType,
    targets,
  } = widget.settings;

  const {
    FinishCustomMessage: { component: FinishCustomMessage, props: customProps },
    FinishDefaultMessage: {
      component: FinishDefaultMessage,
      props: defaultProps,
    },
  } = overrides;

  const targetList = getTargetList(targets) || [];

  useEffect(() => {
    const hasCounter = !!widget.settings.count_text;
    if (hasCounter) {
      // return countTwilioCallsByWidget({ widgetId: widget.id })
      //   .then(({ phonePressureCount }: { phonePressureCount: number }) =>
      //     addPhonePressureCount(phonePressureCount)
      //   )
      //   .catch((err: any) => console.error(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widget.settings.count_text]);

  useEffect(() => {
    if (!callTransition && targetList && targetList.length) {
      const value = targetList.map((target: any) => ({
        ...parseTarget(target),
        attempts: 0,
      }));
      return setCalls(value);
    }

    if (callTransition && targetList && targetList.length) {
      const value = callManagement.map((target, index) => {
        const isCallToCurrentTarget =
          target.value === callTransition.twilioCallTo;
        const transition = isCallToCurrentTarget ? callTransition : {};
        const { twilioCallTransitionStatus: status } = transition;
        const isFailStatus = ['busy', 'failed', 'no-answer'].includes(status);

        let attempts = callManagement[index].attempts;
        if (isCallToCurrentTarget && isFailStatus) attempts++;

        return { ...target, ...transition, attempts };
      });
      setCalls(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callTransition]);

  const handleSubmit = (data: any) => {
    if (targetList.length < 1) {
      return setTargetsError([
        'Ops, você precisa selecionar pelo menos um alvo para poder pressionar',
      ]);
    }

    // normalize phone number with + sign (e.g. +5511987654321)
    data.phone = /^\+/.test(data.phone) ? data.phone : `+${data.phone}`;

    setTargetsError([]);

    return call(
      {
        widgetId: widget.id,
        communityId: mobilization.community_id,
        from: data.phone,
        // get phone
        to: getEmailTarget(arrayUtils.shuffle(targetList)[0]),
      },
      true
    );
  };

  const finishPressure =
    showFinishMessage && FinishCustomMessage && FinishDefaultMessage;

  if (finishPressure)
    return finishMessageType === 'custom' ? (
      <FinishCustomMessage
        mobilization={mobilization}
        widget={widget}
        {...customProps}
      />
    ) : (
      <FinishDefaultMessage
        mobilization={mobilization}
        widget={widget}
        {...defaultProps}
      />
    );

  // console.log("callTransition", { callTransition });
  return (
    <PhoneFormStyled id={`widget-${widget.id}`}>
      {/* <div onKeyDown={e => e.stopPropagation()} /> */}
      <Header backgroundColor={mainColor}>{callToAction || titleText}</Header>
      <Targets targets={targetList} pressureType="phone" />
      {callTransition ? (
        <CallingTargets
          addTwilioCallMutation={call}
          buttonColor={mainColor}
          toggleFinishMessage={toggleFinishMessage}
          callManagement={callManagement}
        />
      ) : (
        <>
          <Form
            widget={widget}
            onSubmit={handleSubmit}
            pureTargets={[]}
            saving={!!showFinishMessage}
            BeforeStandardFields={() =>
              PhoneFields(targetList, analyticsEvents.pressureIsFilled())
            }
            errors={targetsError}
          />
          {countText && (
            <Count
              value={phonePressureCount || widget.count || 0}
              // value={widget.count || 0}
              color={mainColor}
              text={countText}
              startCounting={block.scrollTopReached}
            />
          )}
        </>
      )}
    </PhoneFormStyled>
  );
};

// PhonePressure.defaultProps = {
//   saving: false,
//   overrides: {
//     FinishDefaultMessage: { Component: () => null, props: {} },
//   },
//   filledPressureWidgets: [],
//   widget: {
//     settings: {
//       main_color: '#f23392',
//       title_text: 'Converse com quem pode tomar essa decisão',
//       button_text: 'Enviar',
//       disable_edit_field: 'n',
//       target: '',
//     },
//   },
//   AfterStandardFields: () => null,
// };

export default PhonePressure;
