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
import { Translate } from '../../../../components/MobilizationClass';
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
      pressure_type?: string | 'unique' | 'group';
      select_label?: string;
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
      pressure_type,
      select_label,
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
          <Translate>
            {({ t }: any) => (
              <Wrapper>
                <WrapFields>
                  {pressure_type === 'group' && options.length > 0 && (
                    <WrapInputs inverted>
                      <RoundSelectField
                        options={options}
                        label={select_label || t('Pressure Targets Label')}
                        name="targetsInput"
                        placeholder={t("Pressure Targets Placeholder")}
                        onChange={e => {
                          const group = pureTargets.filter(
                            (gt: GroupTarget) => gt.identify === e.value
                          )[0];
                          const { setValue } = form.mutators;

                          if (!!group && group.email_subject)
                            setValue('subject', group.email_subject);
                          else setValue('subject', subject);
                          if (!!group && group.email_body)
                            setValue('body', group.email_body);
                          else setValue('body', body);
                        }}
                      />
                    </WrapInputs>
                  )}
                  {BeforeStandardFields && <BeforeStandardFields />}
                  <WrapInputs>
                    <InputField
                      label={t("Pressure Name Label")}
                      name="name"
                      placeholder={t("Pressure Name Placeholder")}
                      validate={required(t("Pressure Blank Validation"))}
                    />
                  </WrapInputs>
                  <WrapInputs>
                    <InputField
                      label={t("Pressure Lastname Label")}
                      name="lastname"
                      placeholder={t("Pressure Lastname Placeholder")}
                      validate={required(t("Pressure Blank Validation"))}
                    />
                  </WrapInputs>
                  {showCity && showCity === 'city-true' && (
                    <WrapInputs>
                      <InputField
                        label={t("Pressure City Label")}
                        name="city"
                        placeholder={t("Pressure City Placeholder")}
                        validate={required(t("Pressure Blank Validation"))}
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
                    {submitting || saving ? t("Pressure Saving") : buttonText}
                  </Button>
                  <LGPD color="#545454" />
                </ButtonWrapper>
              </Wrapper>
            )}
          </Translate>
        );
      }}
    </ConnectedForm>
  );
};

export default PressureForm;
