import React, { useState } from 'react';
import DonationForm from './components/DonationForm';
import DonationButton from './components/DonationButton';
import SelectPaymentType from './components/SelectPaymentType';

type Props = {
  extraProps: {
    mainColor: string;
    title: string;
    paymentType: string;
    recurringPeriod: number;
  };
  mobilization: any;
  widget: {
    settings: {
      main_color?: string;
      title_text?: string;
      call_to_action?: string;
      payment_type?: string;
      recurring_period?: number;
      donation_value1?: number;
      donation_value2?: number;
      donation_value3?: number;
      donation_value4?: number;
      donation_value5?: number;
    };
  };
};

const DonationPlugin: React.FC<Props> = ({
  extraProps,
  widget,
  mobilization,
}) => {
  const { headerFont } = mobilization;
  const {
    settings: {
      main_color: mainColor,
      title_text: titleText,
      call_to_action: callToAction,
      payment_type: paymentType,
      recurring_period: recurringPeriod,
      donation_value1: donationValue1,
      donation_value2: donationValue2,
      donation_value3: donationValue3,
      donation_value4: donationValue4,
      donation_value5: donationValue5,
    },
  } = widget;
  // States
  const [selectedPaymentType, setSelectedPaymentType] = useState(
    !!paymentType && paymentType !== 'users_choice'
      ? paymentType
      : extraProps.paymentType
  );
  const [selectedValue, setSelectedValue] = useState(0);

  const recurringLabel = ({ 30: 'mês', 180: 'semestre', 365: 'ano' } as Record<
    number,
    any
  >)[recurringPeriod || extraProps.recurringPeriod];

  return (
    <DonationForm
      headerFont={headerFont}
      mainColor={mainColor || extraProps.mainColor}
      title={callToAction || titleText || extraProps.title}
    >
      {paymentType === 'users_choice' && (
        <SelectPaymentType
          mainColor={mainColor || extraProps.mainColor}
          selected={selectedPaymentType}
          onSelect={setSelectedPaymentType}
          uniqueLabel="Doação única"
          recurringLabel={`Apoiar todo ${recurringLabel}`}
        />
      )}
      {donationValue1 && (
        <DonationButton
          mainColor={mainColor || extraProps.mainColor}
          value={donationValue1}
          label={selectedPaymentType === 'unique' ? '' : recurringLabel}
          paymentType={selectedPaymentType}
          active={selectedValue === 1}
          onClick={() => setSelectedValue(1)}
        />
      )}
      {donationValue2 && (
        <DonationButton
          mainColor={mainColor || extraProps.mainColor}
          value={donationValue2}
          label={selectedPaymentType === 'unique' ? '' : recurringLabel}
          paymentType={selectedPaymentType}
          active={selectedValue === 2}
          onClick={() => setSelectedValue(2)}
        />
      )}
      {donationValue3 && (
        <DonationButton
          mainColor={mainColor || extraProps.mainColor}
          value={donationValue3}
          label={selectedPaymentType === 'unique' ? '' : recurringLabel}
          paymentType={selectedPaymentType}
          active={selectedValue === 3}
          onClick={() => setSelectedValue(3)}
        />
      )}
      {donationValue4 && (
        <DonationButton
          mainColor={mainColor || extraProps.mainColor}
          value={donationValue4}
          label={selectedPaymentType === 'unique' ? '' : recurringLabel}
          paymentType={selectedPaymentType}
          active={selectedValue === 4}
          onClick={() => setSelectedValue(4)}
        />
      )}
      {donationValue5 && (
        <DonationButton
          mainColor={mainColor || extraProps.mainColor}
          value={donationValue5}
          label={selectedPaymentType === 'unique' ? '' : recurringLabel}
          paymentType={selectedPaymentType}
          active={selectedValue === 5}
          onClick={() => setSelectedValue(5)}
        />
      )}
    </DonationForm>
  );
};

DonationPlugin.defaultProps = {
  widget: { settings: {} },
  extraProps: {
    mainColor: '#54d0f6',
    title: 'Clique para configurar seu bloco de doação',
    paymentType: 'recurring',
    recurringPeriod: 30,
  },
};

export default DonationPlugin;
