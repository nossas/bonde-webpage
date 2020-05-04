import React, { useState } from 'react';
import DonationForm from './components/DonationForm';
import DonationButton from './components/DonationButton';
import SelectPaymentType from './components/SelectPaymentType';
import FetchDonationStats from './FetchDonationStats';

type Props = {
  extraProps: {
    mainColor: string;
    title: string;
    paymentType: string;
    recurringPeriod: number;
    buttonText: string;
  };
  // Function created with createApolloFetch
  // https://www.apollographql.com/blog/4-simple-ways-to-call-a-graphql-api-a6807bcdb355
  fetch: any;
  asyncDonationCreate?: any;
  donationCustomerData?: any;
  mobilization: any;
  widget: {
    id: number;
    settings: {
      main_color?: string;
      title_text?: string;
      call_to_action?: string;
      button_text?: string;
      payment_type?: string;
      goal_date_limit?: string;
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
  asyncDonationCreate,
  fetch,
  donationCustomerData,
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
      button_text: buttonText,
      goal_date_limit: goalDateLimit,
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
  const [selectedValue, setSelectedValue] = useState(1);
  const [loading, setLoading] = useState(false);

  const recurringLabel = ({ 30: 'mês', 180: 'semestre', 365: 'ano' } as Record<
    number,
    any
  >)[recurringPeriod || extraProps.recurringPeriod];

  const handleClickDonate = async () => {
    if (asyncDonationCreate) {
      setLoading(true);
      await asyncDonationCreate({
        mobilization,
        widget,
        selectedValue,
        selectedPaymentType,
        storedDonationCustomerData: donationCustomerData,
      });
      console.log('successfully');
      setLoading(false);
    }
  };

  return (
    <>
      <DonationForm
        headerFont={headerFont}
        mainColor={mainColor || extraProps.mainColor}
        title={callToAction || titleText || extraProps.title}
        buttonText={buttonText || extraProps.buttonText}
        onClickDonate={handleClickDonate}
        loading={loading}
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
      {fetch && goalDateLimit && (
        <FetchDonationStats
          fetch={fetch}
          widgetId={widget.id}
          mainColor={mainColor || extraProps.mainColor}
          goalDateLimit={goalDateLimit}
        />
      )}
    </>
  );
};

DonationPlugin.defaultProps = {
  widget: { id: 0, settings: {} },
  extraProps: {
    mainColor: '#54d0f6',
    title: 'Clique para configurar seu bloco de doação',
    paymentType: 'recurring',
    recurringPeriod: 30,
    buttonText: 'Doar agora',
  },
};

export default DonationPlugin;
