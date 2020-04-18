import PropTypes from 'prop-types';
import React, { useState } from 'react';
import CountUp from 'react-countup';
// import { intlShape } from 'react-intl'
import { Button, Input, Raise } from './components';
import { getFieldName, validate, fields } from './utils';

const renderCallToAction = (widget: any, { header_font: headerFont }: any) => {
  const callToAction = (widget.settings && widget.settings.call_to_action
    ? widget.settings.call_to_action
    : 'Clique para configurar seu formulário...'
  ).replace('\n', '<br/><br/>');

  return (
    <h2 className="mt0 mb3 center white" style={{ fontFamily: headerFont }}>
      {callToAction}
    </h2>
  );
};

const renderFields = (
  { analyticsEvents, widget: { settings }, ...props }: any,
  handleChange: any
) => {
  return fields(settings).map((field: any, index: any) => {
    return (
      <Input
        {...props}
        key={field.uid}
        name={getFieldName(field)}
        onChange={handleChange}
        onBlur={Number(index) === 0 ? analyticsEvents.formIsFilled() : () => {}}
        field={field}
      />
    );
  });
};

const renderButton = (
  { widget, ...props }: any,
  success: any,
  loading: any
) => (
  <Button
    {...props}
    buttonText={(widget.settings && widget.settings.button_text) || 'Enviar'}
    loading={loading}
    success={success}
  />
);

const renderCount = ({
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

const renderErrors = (errors: any) => {
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
  const message = fields(widget.settings).map((field: any) => {
    if (field.kind === 'greetings') return field.placeholder;
    return '';
  });

  if (message[0] === '') {
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

const Form = (props: any) => {
  const { asyncFormEntryCreate, mobilization, widget } = props;
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

  const renderForm = ({ widget, mobilization }: any, errors: any) => {
    const bgcolor =
      widget.settings && widget.settings.main_color
        ? widget.settings.main_color
        : 'rgba(0,0,0,0.25)';

    return (
      <div>
        <div
          className="rounded p3 relative"
          style={{ backgroundColor: bgcolor }}
        >
          <form onSubmit={submit}>
            {renderCallToAction(widget, mobilization)}
            {renderFields(props, handleChange)}
            {errors.length > 0 && renderErrors(errors)}
            {widget.settings.fields && renderButton(props, success, loading)}
          </form>
        </div>
      </div>
    );
  };

  const { header_font: headerFont } = mobilization;

  return (
    <div className={`widget ${headerFont}-header`}>
      {success ? renderShareButtons(props) : renderForm(props, errors)}
      {widget.settings && widget.settings.count_text && renderCount(props)}
    </div>
  );
};

const { any, object, shape, string } = PropTypes;

Form.propTypes = {
  mobilization: object.isRequired,
  widget: shape({
    settings: shape({
      finish_message_type: string,
    }).isRequired,
  }).isRequired,
  analyticsEvents: object,
  overrides: shape({
    FinishCustomMessage: shape({
      component: any,
      props: object,
    }).isRequired,
    FinishDefaultMessage: shape({
      component: any,
      props: object,
    }).isRequired,
  }).isRequired,
};

Form.defaultProps = {
  overrides: {
    FinishCustomMessage: { props: {} },
    FinishDefaultMessage: { props: {} },
  },
};

export default Form;
