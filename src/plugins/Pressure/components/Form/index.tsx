import React from 'react';
import {
  ConnectedForm,
  InputField,
  Validators,
  Button,
} from 'bonde-components';
// import BeforeStandardFields from '../Form/BeforeStandardFields';
import { Wrapper, ButtonWrapper, WrapInputs } from './styles';

type Props = {
  onSubmit: any;
  widget: {
    settings: {
      show_city: boolean | string;
      button_text: string;
      main_color?: string;
    };
  };
  BeforeStandardFields: any;
  AfterStandardFields: any;
  saving: boolean;
  initialValues?: {
    subject: string;
    body: string;
  };
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
