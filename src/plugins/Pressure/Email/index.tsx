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

  /* These props come from the plugin.connected component */
  saving: boolean;
  filledPressureWidgets: Array<any>;
  asyncFillWidget: Function;
};

const EmailPressure = ({
  widget,
  asyncFillWidget,
  mobilization,
  block,
  saving,
  filledPressureWidgets,
  // analyticsEvents,
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

  const [targetsError, setTargetsError] = useState<string | undefined>(
    undefined
  );

  const handleSubmit = (data: any) => {
    if (targets.length < 1) {
      return setTargetsError(
        'Ops, você precisa selecionar pelo menos um alvo para poder pressionar'
      );
    }
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
          saving={saving}
          BeforeStandardFields={() => EmailFields.before(targetList)} // pass analytics here
          AfterStandardFields={() =>
            EmailFields.after(disableEditField === 's')
          }
          noTargetsError={targetsError}
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

EmailPressure.defaultProps = {
  overrides: {
    FinishCustomMessage: { props: {} },
    FinishDefaultMessage: { props: {} },
  },
  widget: {
    settings: {
      main_color: '#f23392',
      title_text: 'Pressione quem pode tomar essa decisão',
      button_text: 'Enviar',
      disable_edit_field: 'n',
    },
  },
};

export default EmailPressure;
