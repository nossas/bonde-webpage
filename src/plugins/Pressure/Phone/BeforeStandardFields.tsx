import React from 'react';
import Fields from '../components/Fields';
import { Validators } from 'bonde-components';
import { validateUtils } from '../utils';

const { required, composeValidators } = Validators;

const PhoneBeforeStandardFields = ({
  targetList,
}: {
  targetList: Array<any>;
}) => (
  <Fields
    fields={[
      {
        name: 'phone',
        label: 'Telefone',
        type: 'text',
        placeholder: 'Insira seu telefone. Ex: +5511987654321',
        validate: composeValidators(
          required('Preenchimento obrigatório'),
          validateUtils.isValidPhoneE164({
            code:
              'Informe o código do país e o DDD com dois dígitos. Ex: +5511',
            invalid: 'Telefone inválido',
          }),
          validateUtils.checkPhoneTargetsList(
            'O telefone que você está tentando usar é de um dos alvos da mobilização.',
            targetList
          )
        ),
      },
    ]}
  />
);

export default PhoneBeforeStandardFields;
