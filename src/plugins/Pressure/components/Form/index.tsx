import React from 'react';
import {
  ConnectedForm,
  InputField,
  Validators,
  Button,
  RoundSelectField,
} from 'bonde-components';
import {
  WrapFields,
  ButtonWrapper,
  WrapInputs,
  Wrapper,
  WrapRaise,
} from './styles';
import { Raise } from '../../../../components';
import LGPD from '../../../../components/ux/LGPD';
import { GroupTarget } from '../Targets';

type Props = {
  onSubmit: any;
  pureTargets: GroupTarget[];
  widget: {
    id: number;
    count?: number;
    settings: {
      main_color: string;
      show_city?: string;
      button_text: string;
      pressure_subject?: string;
      pressure_body?: string;
      call_to_action?: string;
      title_text?: string;
      disable_edit_field?: any;
      finish_message_type?: string;
      finish_message?: Record<any, any>;
      finish_message_background?: string;
      targets?: string;
      count_text?: string;
    };
  };
  BeforeStandardFields: any;
  AfterStandardFields?: any;
  saving: boolean;
  errors: Array<string>;
};

type FormProps = {
  submitting: boolean;
  form: any;
};

const PressureForm = ({
  widget,
  pureTargets,
  BeforeStandardFields,
  AfterStandardFields,
  onSubmit,
  saving,
  errors,
}: Props) => {
  const { required } = Validators;
  const {
    settings: {
      show_city: showCity,
      main_color: buttonColor,
      button_text: buttonText,
      pressure_subject: subject = '',
      pressure_body: body = '',
    },
  } = widget;

  let options: any[] = pureTargets.map((groupTarget: GroupTarget) => ({
    label: groupTarget.label,
    value: groupTarget.identify,
  }));

  return (
    <ConnectedForm
      onSubmit={onSubmit}
      initialValues={{ subject, body }}
      mutators={{
        setValue: ([field, value], state, { changeValue }) => {
          changeValue(state, field, () => value);
        },
      }}
    >
      {({ submitting, form }: FormProps) => {
        return (
          <Wrapper>
            <WrapFields>
              {options.length > 0 && (
                <WrapInputs inverted>
                  <RoundSelectField
                    options={options}
                    label="Selecione os alvos"
                    name="targetsInput"
                    placeholder="Selecione"
                    onChange={e => {
                      const group = pureTargets.filter(
                        (gt: GroupTarget) => gt.identify === e.value
                      )[0];
                      const { setValue } = form.mutators;

                      if (!!group && group.email_subject)
                        setValue('subject', group.email_subject);
                      else setValue('subject', subject);
                      if (!!group && group.email_body)
                        setValue('body', group.email_subject);
                      else setValue('body', body);
                    }}
                  />
                </WrapInputs>
              )}
              {BeforeStandardFields && <BeforeStandardFields />}
              <WrapInputs>
                <InputField
                  label="Nome"
                  name="name"
                  placeholder="Insira seu nome"
                  validate={required('Preenchimento obrigatório')}
                />
              </WrapInputs>
              <WrapInputs>
                <InputField
                  label="Sobrenome"
                  name="lastname"
                  placeholder="Insira seu sobrenome"
                  validate={required('Preenchimento obrigatório')}
                />
              </WrapInputs>
              {showCity && showCity === 'city-true' && (
                <WrapInputs>
                  <InputField
                    label="Cidade"
                    name="city"
                    placeholder="Insira sua cidade"
                    validate={required('Preenchimento obrigatório')}
                  />
                </WrapInputs>
              )}
              {AfterStandardFields && <AfterStandardFields />}
            </WrapFields>
            {errors.length >= 1 && (
              <>
                {errors.map((error: string, i: number) => (
                  <WrapRaise key={`error-${i}`}>
                    <Raise message={error} />
                  </WrapRaise>
                ))}
              </>
            )}
            <ButtonWrapper color={buttonColor}>
              <Button type="submit" disabled={submitting}>
                {submitting || saving ? 'Enviando...' : buttonText}
              </Button>
              <LGPD color="#545454" />
            </ButtonWrapper>
          </Wrapper>
        );
      }}
    </ConnectedForm>
  );
};

export default PressureForm;
