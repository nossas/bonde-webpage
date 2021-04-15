import React from 'react';
import Fields from '../components/Form/Fields';
import { Validators } from 'bonde-components';
import { validateUtils } from '../utils';
import { Translate } from '../../../components/MobilizationClass';

const { required, isEmail, composeValidators } = Validators;

const before = (targetList: Array<any>, onBlur: any) => (
  <Translate>
    {({ t }: any) => (
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
              required(t('Pressure Blank Validation')),
              isEmail(t("Pressure Email Validation")),
              validateUtils.checkEmailTargetsList(
                'O email que você está tentando usar é de um dos alvos da mobilização.',
                targetList
              )
            ),
          },
        ]}
      />
    )}
  </Translate>
);

type AfterProps = {
  disableSubjectAndBody: boolean;
};

const after = ({ disableSubjectAndBody }: AfterProps) => {
  return (
    <Translate>
      {({ t }: any) => (
        <Fields
          fields={[
            {
              name: 'subject',
              label: 'Assunto',
              type: 'text',
              disabled: disableSubjectAndBody,
              placeholder: 'Insira seu e-mail',
              validate: required(t("Pressure Blank Validation")),
            },
            {
              name: 'body',
              label: 'Corpo do e-mail',
              type: 'textarea',
              disabled: disableSubjectAndBody,
              placeholder: 'Insira seu e-mail',
              validate: required(t("Pressure Blank Validation")),
            },
          ]}
        />
      )}
    </Translate>
  );
};

export default { before, after };
