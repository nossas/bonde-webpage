import React, { useState, useEffect } from 'react';
import { arrayUtils, pressureUtils } from './utils';
import { Count, Form, Targets } from './components';
import { Header } from './styles';
import EmailFields from './Email';
import PhoneFields from './Phone';
import CallingTargets from './Phone/CallingTargets';

/* TODO: Change static content by props
 * - title
 * - bgColor
 */

type Props = {
  /* Below props are from root parent */
  editable: boolean;
  mobilization: {
    header_font: string;
    community_id: string | number;
  };
  widget: {
    id: number | string;
    count: number;
    settings: {
      main_color: string;
      call_to_action?: string;
      title_text: string;
      button_text: string;
      pressure_subject?: string;
      pressure_body?: string;
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
    scrollTopReached: any;
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

  /* */

  saving: boolean;
  filledPressureWidgets: Array<any>;
  asyncFillWidget: Function;

  /* Below props are created in direct parent */
  countTwilioCallsByWidget: Function;
  twilioCall: Function;
  callTransition: any;
};

const renderFields = (
  pressureType: string,
  {
    Email,
    Phone,
  }: { Email?: React.ReactNode | null; Phone?: React.ReactNode | null }
) => {
  if (pressureType === 'email') return Email;
  if (pressureType === 'phone') return Phone;
  return null;
};

const parseTarget = (target: string) => {
  const targetSplit = target.split('<');
  const valid = targetSplit.length === 2;
  return valid
    ? { name: targetSplit[0].trim(), value: targetSplit[1].replace('>', '') }
    : null;
};

const Pressure = ({
  widget,
  asyncFillWidget,
  twilioCall,
  mobilization,
  block,
  saving,
  filledPressureWidgets,
  overrides,
  // analyticsEvents,
  callTransition,
  countTwilioCallsByWidget,
}: Props) => {
  const {
    main_color: mainColor,
    call_to_action: callToAction,
    title_text: titleText,
    // Maybe `reply_email` is necessary...
    // reply_email,
    count_text: countText,
    pressure_subject: pressureSubject,
    pressure_body: pressureBody,
    finish_message_type: finishMessageType,
    disable_edit_field: disableEditField,
    targets,
  } = widget.settings;

  const {
    FinishCustomMessage: { component: FinishCustomMessage, props: customProps },
    FinishDefaultMessage: {
      component: FinishDefaultMessage,
      props: defaultProps,
    },
  } = overrides;

  const getTargetList = (targets: string = ''): Array<string> =>
    targets.split(';').filter((target: string) => !!target.trim());

  const targetList = getTargetList(targets) || [];
  const pressureType = pressureUtils.getType(targetList);

  const [targetsError, setTargetsError] = useState<string | undefined>(
    undefined
  );
  const [phonePressureCount, setPressureCount] = useState<number | undefined>(
    undefined
  );
  const [showFinishMessage, toggleFinishMessage] = useState(false);
  const [callManagement, setCalls] = useState<Array<any>>([]);

  useEffect(() => {
    const isPressurePhone = pressureType === pressureUtils.PRESSURE_TYPE_PHONE;
    const hasCounter = !!widget.settings.count_text;
    if (hasCounter && isPressurePhone) {
      return countTwilioCallsByWidget({ widgetId: widget.id })
        .then(({ phonePressureCount }: { phonePressureCount: number }) =>
          setPressureCount(phonePressureCount)
        )
        .catch((err: any) => console.error(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pressureType, widget.settings.count_text]);

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

  const getEmailTarget = (target: string) => {
    const targetSplit = target.split('<');
    return targetSplit[1].replace('>', '');
  };

  const handleSubmit = (data: any) => {
    if (data.pressureType === pressureUtils.PRESSURE_TYPE_EMAIL) {
      const payload = {
        activist: {
          firstname: data.name,
          lastname: data.lastname,
          email: data.email,
          city: data.city || null,
        },
        mail: {
          cc: targetList.map((target: string) => getEmailTarget(target)),
          subject: data.subject,
          body: data.body,
        },
      };
      return asyncFillWidget({ payload, widget });
    } else if (data.pressureType === pressureUtils.PRESSURE_TYPE_PHONE) {
      if (targets.length < 1) {
        return setTargetsError(
          'Ops, você precisa selecionar pelo menos um alvo para poder pressionar'
        );
      }

      // normalize phone number with + sign (e.g. +5511987654321)
      data.phone = /^\+/.test(data.phone) ? data.phone : `+${data.phone}`;

      setTargetsError(undefined);

      twilioCall(
        {
          widgetId: widget.id,
          communityId: mobilization.community_id,
          from: data.phone,
          to: getEmailTarget(arrayUtils.shuffle(targetList)[0]),
        },
        true
      );
    }
    return setTargetsError(
      'Ops, você precisa selecionar pelo menos um alvo para poder pressionar'
    );
  };

  const finishPressure =
    (filledPressureWidgets.includes(widget.id) || showFinishMessage) &&
    FinishCustomMessage &&
    FinishDefaultMessage;

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
      <Header backgroundColor={mainColor} fontFamily={mobilization.header_font}>
        {callToAction || titleText}
      </Header>
      <Targets targets={targetList} pressureType={pressureType} />
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
            saving={saving}
            initialValues={{
              body: pressureBody || '',
              subject: pressureSubject || '',
            }}
            BeforeStandardFields={() =>
              renderFields(pressureType, {
                Email: EmailFields.before(targetList),
                Phone: PhoneFields.before(targetList),
              })
            }
            AfterStandardFields={() =>
              renderFields(pressureType, {
                Email: EmailFields.after(disableEditField === 's'),
                Phone: null,
              })
            }
            noTargetsError={targetsError}
            // analyticsEvents={analyticsEvents}
          />
          {countText && (
            <Count
              value={phonePressureCount || widget.count || 0}
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

Pressure.defaultProps = {
  overrides: {
    FinishCustomMessage: { props: {} },
    FinishDefaultMessage: { props: {} },
  },
  widget: {
    settings: {
      main_color: '#f23392',
      title_text: 'Converse com quem pode tomar essa decisão',
      button_text: 'Enviar',
      disable_edit_field: 'n',
    },
  },
};

export default Pressure;
