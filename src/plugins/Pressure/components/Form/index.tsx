import React from 'react';
import {
  ConnectedForm,
  InputField,
  Validators,
  Button,
} from 'bonde-components';
// import BeforeStandardFields from '../Form/BeforeStandardFields';
import { Wrapper, ButtonWrapper } from './styles';

type Props = {
  onSubmit: any;
  mobilization?: Record<any, any>;
  widget: {
    settings: {
      show_city: boolean | string;
      button_text?: string;
      main_color?: string;
    };
  };
  changeParentState?: Function;
  analyticsEvents?: any;
  BeforeStandardFields: any;
  AfterStandardFields: any;
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
}: Props) => {
  const { required } = Validators;

  return (
    <ConnectedForm
      onSubmit={onSubmit}
      // initialValues={{ city: 'Belo Horizonte' }}
    >
      {({ submitting }) => {
        return (
          <>
            <Wrapper>
              <BeforeStandardFields />
              <InputField
                label="Nome"
                name="name"
                placeholder="Insira seu nome"
                validate={required('Preenchimento obrigatório')}
              />
              <InputField
                label="Sobrenome"
                name="lastname"
                placeholder="Insira seu sobrenome"
                validate={required('Preenchimento obrigatório')}
              />
              {(!showCity || showCity === 'city-true') && (
                <InputField
                  label="Cidade"
                  name="city"
                  placeholder="Insira sua cidade"
                  validate={required('Preenchimento obrigatório')}
                />
              )}
              <AfterStandardFields />
            </Wrapper>
            <ButtonWrapper color={buttonColor}>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Enviando...' : buttonText}
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
