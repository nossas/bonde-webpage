import React, { useState } from 'react';
import CountUp from 'react-countup';
// import { intlShape } from 'react-intl'
import { Button, Input, Raise } from './components';
import { getFieldName, validate, fields } from './utils';
import styled from 'styled-components';
import { Count } from '../../components';

type Props = {
  mobilization:
    | {
        body_font: string;
        header_font: string;
        main_color?: string;
      }
    | Record<any, any>;
  widget: {
    settings: {
      finish_message_type?: string;
      fields: Array<any>;
      count_text?: string;
      button_text: string;
    };
    id: number;
    form_entries_count: any;
  };
  analyticsEvents: Record<any, any>;
  overrides?: {
    FinishCustomMessage?: {
      component?: React.ReactNode;
      props: any;
    };
    FinishDefaultMessage?: {
      component?: React.ReactNode;
      props: any;
    };
  };
  asyncFormEntryCreate: any;
  block: {
    scrollTopReached: any;
  };
};

const renderCallToAction = (widget: any, { header_font: headerFont }: any) => {
  const callToAction = (widget.settings && widget.settings.call_to_action
    ? widget.settings.call_to_action
    : 'Clique para configurar seu formulário...'
  ).replace('\n', '<br/><br/>');

  const Header = styled.h2`
    color: #ffffff;
    text-align: center;
    margin: 0 0 2rem 0;
    font-weight: normal;
  `;

  return <Header style={{ fontFamily: headerFont }}>{callToAction}</Header>;
};

const WrapInputs = styled.div`
  display: grid;
  grid-row-gap: 1rem;
`;

const renderFields = (
  { analyticsEvents, widget: { settings }, mobilization }: any,
  handleChange: any
) => {
  return (
    <WrapInputs>
      {fields(settings).map((field: any, index: any) => {
        return (
          <Input
            key={field.uid}
            name={getFieldName(field.uid)}
            onChange={handleChange}
            onBlur={
              Number(index) === 0 ? analyticsEvents.formIsFilled() : () => {}
            }
            field={field}
            bodyFont={mobilization && mobilization.body_font}
          />
        );
      })}
    </WrapInputs>
  );
};

const renderButton = (
  { widget, mobilization }: any,
  success: any,
  loading: any
) => (
  <Button
    buttonText={(widget.settings && widget.settings.button_text) || 'Enviar'}
    loading={loading}
    success={success}
    bodyFont={mobilization && mobilization.body_font}
  />
);

export const renderCount = ({
  block: { scrollTopReached: startCounting },
  widget: { form_entries_count: count, settings },
  mobilization: { body_font: bodyFont },
}: any) => {
  return (
    <div className="mt2 h3 center white" style={{ fontFamily: bodyFont }}>
      <CountUp
        start={0}
        end={!isNaN(count) && startCounting ? Number(count) : 0}
        duration={5}
      />
      &nbsp;
      {settings.count_text}
    </div>
  );
};

const renderErrors = (errors: Array<any>) => {
  return (
    <React.Fragment>
      {errors.map((error: any, i: number) => (
        <Raise key={`error-${i}`} message={error} />
      ))}
    </React.Fragment>
  );
};

const renderShareButtons = ({ widget, overrides, mobilization }: any) => {
  // TODO: check how works greetings
  const message = fields(widget.settings).filter((field: any) => {
    if (field.kind === 'greetings') return field.placeholder;
  });

  if (message.length < 1) {
    const {
      settings: { finish_message_type: finishMessageType },
    } = widget;
    const {
      FinishCustomMessage: {
        component: FinishCustomMessage,
        props: customProps,
      },
      FinishDefaultMessage: {
        component: FinishDefaultMessage,
        props: defaultProps,
      },
    } = overrides;

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
  }

  return <p className="center p2 bg-darken-3">{message[0]}</p>;
};

const FormPlugin = (props: Props) => {
  const { asyncFormEntryCreate, mobilization, widget, block } = props;
  const [loading, setLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState([]);
  const [values, setValues] = useState<Record<string, string>>({});

  const submit = async (e: any) => {
    e.preventDefault();

    const fieldsWithValue = widget.settings.fields.map(
      (field: { uid: string }) => ({
        ...field,
        value: values[getFieldName(field.uid)],
      })
    );

    const errors = validate(fieldsWithValue);

    if (errors.length > 0) {
      setErrors(errors);
      setLoader(false);
      setSuccess(false);
    } else {
      setLoader(true);
      const formEntry = {
        widget_id: widget.id,
        fields: JSON.stringify(fieldsWithValue),
      };

      return asyncFormEntryCreate({ mobilization, formEntry }).then(() => {
        setLoader(false);
        setSuccess(true);
        setValues({});
      });
    }
  };

  const handleChange = (e: any) =>
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

  const renderForm = ({ widget, mobilization }: any, errors: Array<any>) => {
    const bgcolor =
      widget.settings && widget.settings.main_color
        ? widget.settings.main_color
        : 'rgba(0,0,0,0.25)';

    const WrapForm = styled.div<{ backgroundColor: string }>`
      padding: 2rem;
      border-radius: 3px;
      position: relative;
      background-color: ${props => props.backgroundColor};
    `;

    return (
      <WrapForm backgroundColor={bgcolor}>
        <form onSubmit={submit}>
          {renderCallToAction(widget, mobilization)}
          {renderFields(props, handleChange)}
          {errors.length > 0 && renderErrors(errors)}
          {widget.settings.fields && renderButton(props, success, loading)}
        </form>
      </WrapForm>
    );
  };

  const { header_font: headerFont } = mobilization;

  return (
    <div className={`widget ${headerFont}-header`}>
      {success ? renderShareButtons(props) : renderForm(props, errors)}
      {widget.settings && widget.settings.count_text && (
        <Count
          startCounting={block.scrollTopReached}
          value={widget.form_entries_count}
          text={widget.settings.count_text || 'formulários preenchidos'}
          fontFamily={mobilization.body_font}
          color={mobilization.main_color || '#000'}
        />
      )}
    </div>
  );
};

export default FormPlugin;

export { default as FormAnalytics } from './Analytics';
export { default as FormTellAFriend } from './TellAFriend';
