import React from 'react';
import Fields from '../components/Form/Fields';
import { Validators } from 'bonde-components';
import { validateUtils } from '../utils';

const { required, isEmail, composeValidators } = Validators;

const before = (targetList: Array<any>, onBlur: any) => (
  <Fields
    fields={[
      {
        name: 'email',
        label: 'E-mail',
        type: 'email',
        placeholder: 'Insira seu e-mail',
        disabled: false,
        onBlur,
        validate: composeValidators(
          required('Preenchimento obrigatório'),
          isEmail('E-mail inválido'),
          validateUtils.checkEmailTargetsList(
            'O email que você está tentando usar é de um dos alvos da mobilização.',
            targetList
          )
        ),
      },
    ]}
  />
);

type AfterProps = {
  disableSubjectAndBody: boolean;
};

const after = ({ disableSubjectAndBody }: AfterProps) => {
  return (
    <Fields
      fields={[
        {
          name: 'subject',
          label: 'Assunto',
          type: 'text',
          disabled: disableSubjectAndBody,
          placeholder: 'Insira seu e-mail',
          validate: required('Preenchimento obrigatório'),
        },
        {
          name: 'body',
          label: 'Corpo do e-mail',
          type: 'textarea',
          disabled: disableSubjectAndBody,
          placeholder: 'Insira seu e-mail',
          validate: required('Preenchimento obrigatório'),
        },
      ]}
    />
  );
};

export default { before, after };
