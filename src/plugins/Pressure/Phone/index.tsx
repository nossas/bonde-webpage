import React, { useState, useEffect } from 'react';

import { Count, Form, Targets } from '../components';
import PhoneFields from './PhoneFields';
import CallingTargets from './CallingTargets';

import { Header } from '../styles';
import {
  parseTarget,
  getEmailTarget,
  arrayUtils,
  getTargetList,
} from '../utils';

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
    id?: number | string;
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
      show_city: boolean | string;
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
  analyticsEvents?: any;

  /* Props that come from direct parent*/
  phonePressureCount: number;
  addPhonePressureCount: (param: number) => void;
  twilioCall: (variables: any, watchQuery: boolean) => any;
  callTransition: any;
  countTwilioCallsByWidget: (id: number) => any;
};

const PhonePressure = ({
  // analyticsEvents,
  widget,
  mobilization,
  block,
  overrides,
  phonePressureCount,
  // addPhonePressureCount,
  // countTwilioCallsByWidget,
  twilioCall,
  callTransition,
}: Props) => {
  const [targetsError, setTargetsError] = useState<string | undefined>(
    undefined
  );
  const [showFinishMessage, toggleFinishMessage] = useState(false);
  const [callManagement, setCalls] = useState<Array<any>>([]);

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
      const value = targetList.map(target => ({
        ...parseTarget(target),
        attempts: 0,
      }));
      setCalls(value);
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
  }, [callTransition, targetList, callManagement]);

  const handleSubmit = (data: any) => {
    if (targetList.length < 1) {
      return setTargetsError(
        'Ops, você precisa selecionar pelo menos um alvo para poder pressionar'
      );
    }

    // normalize phone number with + sign (e.g. +5511987654321)
    data.phone = /^\+/.test(data.phone) ? data.phone : `+${data.phone}`;

    setTargetsError(undefined);

    return twilioCall(
      {
        widgetId: widget.id,
        communityId: mobilization.community_id,
        from: data.phone,
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

  return (
    <div className="pressure-widget">
      <div onKeyDown={e => e.stopPropagation()} />
      <Header backgroundColor={mainColor}>{callToAction || titleText}</Header>
      <Targets targets={targetList} pressureType="phone" />
      {callTransition ? (
        <CallingTargets
          addTwilioCallMutation={twilioCall}
          buttonColor={mainColor}
          toggleFinishMessage={toggleFinishMessage}
          callManagement={callManagement}
        />
      ) : (
        <>
          <Form
            widget={widget}
            onSubmit={handleSubmit}
            saving={!!showFinishMessage}
            BeforeStandardFields={<PhoneFields targetList={targetList} />} // pass analytics here
            noTargetsError={targetsError}
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
    </div>
  );
};

PhonePressure.defaultProps = {
  saving: false,
  overrides: {
    FinishDefaultMessage: { Component: () => null, props: {} },
  },
  filledPressureWidgets: [],
  widget: {
    settings: {
      main_color: '#f23392',
      title_text: 'Converse com quem pode tomar essa decisão',
      button_text: 'Enviar',
      disable_edit_field: 'n',
      target: '',
    },
  },
  AfterStandardFields: () => null,
};

export default PhonePressure;
