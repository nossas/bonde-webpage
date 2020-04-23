import React from 'react';
import Fields from '../components/Fields';
import { Validators } from 'bonde-components';
import { validateUtils } from '../utils';

const { required, isEmail, composeValidators } = Validators;

const before = (targetList: Array<any>) => (
  <Fields
    fields={[
      {
        name: 'email',
        label: 'E-mail',
        type: 'email',
        placeholder: 'Insira seu e-mail',
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

const after = (disableSubjectAndBody: boolean) =>
  disableSubjectAndBody ? null : (
    <Fields
      fields={[
        {
          name: 'subject',
          label: 'Assunto',
          type: 'text',
          placeholder: 'Insira seu e-mail',
          validate: required('Preenchimento obrigatório'),
        },
        {
          name: 'body',
          label: 'Corpo do e-mail',
          type: 'textarea',
          placeholder: 'Insira seu e-mail',
          validate: required('Preenchimento obrigatório'),
        },
      ]}
    />
  );

export default { before, after };
