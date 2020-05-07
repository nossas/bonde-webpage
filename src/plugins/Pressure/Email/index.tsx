import React, { useState } from 'react';
import { Count, Form, Targets } from '../components';
import { Header } from '../styles';
import EmailFields from './EmailFields';
import { getTargetList, getEmailTarget } from '../utils';

/* TODO: Change static content by props
 * - title
 * - bgColor
 */

type Props = {
  /* Below props are from root parent */
  editable: boolean;
  mobilization: any;
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
      disable_edit_field: string;
      targets: string;
      finish_message_type?: string;
      finish_message?: Record<any, any>;
      finish_message_background?: string;
      count_text?: string;
      show_city?: string;
    };
  };
  block: {
    scrollTopReached: boolean;
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
  asyncFillWidget: (params: {
    payload: Record<string, any>;
    widget: Record<string, any>;
  }) => Promise<{ widget: any }>;
};

const EmailPressure = ({
  widget,
  asyncFillWidget,
  mobilization,
  block,
  analyticsEvents,
  overrides,
}: Props) => {
  const {
    main_color: mainColor,
    call_to_action: callToAction,
    title_text: titleText,
    // Maybe `reply_email` is necessary...
    // reply_email,
    count_text: countText,
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

  const targetList = getTargetList(targets) || [];
  const [errors, setError] = useState<Array<string>>([]);
  const [status, setStatus] = useState<string>('idle');
  const [filledPressureWidgets, setFilledPressureWidgets] = useState<
    Array<any>
  >([]);

  const handleSubmit = async (data: any) => {
    if (targetList.length < 1) {
      return setError([
        'Ops, você precisa selecionar pelo menos um alvo para poder pressionar',
      ]);
    }
    setStatus('pending');
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
    try {
      await asyncFillWidget({ payload, widget });
      setStatus('fulfilled');
      setFilledPressureWidgets([...filledPressureWidgets, widget.id]);
    } catch (e) {
      setStatus('rejected');
      setError(['Houve um erro ao fazer a pressão']);
    }
  };

  const finishPressure =
    filledPressureWidgets.includes(widget.id) &&
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
    <div id={`widget-${widget.id}`}>
      <div onKeyDown={e => e.stopPropagation()} />
      <Header backgroundColor={mainColor}>{callToAction || titleText}</Header>
      <Targets targets={targetList} pressureType={'email'} />
      <>
        <Form
          widget={widget}
          onSubmit={handleSubmit}
          saving={status === 'pending'}
          BeforeStandardFields={() =>
            EmailFields.before(targetList, analyticsEvents.pressureIsFilled())
          }
          AfterStandardFields={() =>
            EmailFields.after(disableEditField === 's')
          }
          errors={errors}
        />
        {countText && (
          <Count
            value={widget.count || 0}
            color={mainColor}
            text={countText}
            startCounting={block.scrollTopReached}
          />
        )}
      </>
    </div>
  );
};

// EmailPressure.defaultProps = {
//   widget: {
//     settings: {
//       main_color: '#f23392',
//       title_text: 'Pressione quem pode tomar essa decisão',
//       button_text: 'Enviar',
//       disable_edit_field: 'n',
//     },
//   },
// };

export default EmailPressure;
