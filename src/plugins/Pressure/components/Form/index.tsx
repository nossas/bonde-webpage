import React from 'react';
import {
  ConnectedForm,
  InputField,
  Validators,
  Button,
} from 'bonde-components';
import { Wrapper, ButtonWrapper } from './styles';

type Props = {
  onSubmit: () => Promise<any>;
  subject: string;
  body: string;
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
  beforeStandardForm: () => React.ReactNode;
  afterStandardForm: () => React.ReactNode;
};

const PressureForm = ({
  widget: {
    settings: {
      show_city: showCity,
      main_color: buttonColor,
      button_text: buttonText,
    },
  },
  beforeStandardForm,
  afterStandardForm,
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
              {beforeStandardForm()}
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
              {afterStandardForm()}
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
  subject: '',
  body: '',
  widget: {
    button_text: 'Enviar e-mail',
  },
  changeParentState: () => {},
  beforeStandardForm: () => <div>Antes</div>,
  afterStandardForm: () => <div>Depois</div>,
};

export default PressureForm;
