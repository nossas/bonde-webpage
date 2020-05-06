import React from 'react';
import {
  ConnectedForm,
  InputField,
  Validators,
  Button,
} from 'bonde-components';
import {
  WrapFields,
  ButtonWrapper,
  WrapInputs,
  Wrapper,
  WrapRaise,
} from './styles';
import { Raise } from '../../../../components';

type Props = {
  onSubmit: any;
  widget: {
    id?: number | string;
    count?: number;
    settings: {
      main_color: string;
      show_city: boolean | string;
      button_text: string;
      pressure_subject: string;
      pressure_body: string;
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
};

const PressureForm = ({
  widget: {
    settings: {
      show_city: showCity,
      main_color: buttonColor,
      button_text: buttonText,
      pressure_subject: subject = '',
      pressure_body: body = '',
    },
  },
  BeforeStandardFields,
  AfterStandardFields,
  onSubmit,
  saving,
  errors,
}: Props) => {
  const { required } = Validators;
  return (
    <ConnectedForm onSubmit={onSubmit} initialValues={{ subject, body }}>
      {({ submitting }: FormProps) => {
        return (
          <Wrapper>
            <WrapFields>
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
            {errors.length > 1 && (
              <>
                {errors.map((error: string) => (
                  <WrapRaise>
                    <Raise message={error} />
                  </WrapRaise>
                ))}
              </>
            )}
            <ButtonWrapper color={buttonColor}>
              <Button type="submit" disabled={submitting}>
                {submitting || saving ? 'Enviando...' : buttonText}
              </Button>
            </ButtonWrapper>
          </Wrapper>
        );
      }}
    </ConnectedForm>
  );
};

export default PressureForm;
