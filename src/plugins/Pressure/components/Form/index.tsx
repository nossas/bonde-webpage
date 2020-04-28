import React from 'react';
import {
  ConnectedForm,
  InputField,
  Validators,
  Button,
} from 'bonde-components';
// import BeforeStandardFields from '../Form/BeforeStandardFields';
import { Wrapper, ButtonWrapper, WrapInputs, Error } from './styles';

type Props = {
  onSubmit: any;
  widget: {
    id?: number | string;
    count?: number;
    settings: {
      main_color?: string;
      call_to_action?: string;
      title_text?: string;
      button_text?: string;
      pressure_subject?: string;
      pressure_body?: string;
      disable_edit_field?: any;
      finish_message_type?: string;
      finish_message?: Record<any, any>;
      finish_message_background?: string;
      targets?: string;
      count_text?: string;
      show_city: boolean | string;
    };
  };
  BeforeStandardFields: any;
  AfterStandardFields: any;
  saving: boolean;
  initialValues?: {
    subject: string;
    body: string;
  };
  noTargetsError?: string;
};

const PressureForm = ({
  widget: {
    settings: {
      show_city: showCity,
      main_color: buttonColor,
      button_text: buttonText,
    },
  },
  BeforeStandardFields,
  AfterStandardFields,
  onSubmit,
  saving,
  initialValues,
  noTargetsError,
}: Props) => {
  const { required } = Validators;
  return (
    <ConnectedForm onSubmit={onSubmit} initialValues={initialValues}>
      {({ submitting }) => {
        return (
          <>
            <Wrapper>
              <BeforeStandardFields />
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
              {(!showCity || showCity === 'city-true') && (
                <WrapInputs>
                  <InputField
                    label="Cidade"
                    name="city"
                    placeholder="Insira sua cidade"
                    validate={required('Preenchimento obrigatório')}
                  />
                </WrapInputs>
              )}
              <AfterStandardFields />
            </Wrapper>
            {noTargetsError && <Error>{noTargetsError}</Error>}
            <ButtonWrapper color={buttonColor}>
              <Button type="submit" disabled={submitting}>
                {submitting || saving ? 'Enviando...' : buttonText}
              </Button>
            </ButtonWrapper>
          </>
        );
      }}
    </ConnectedForm>
  );
};

PressureForm.defaultProps = {
  widget: {
    settings: {
      button_text: 'Enviar e-mail',
    },
  },
  changeParentState: () => {},
};

export default PressureForm;
