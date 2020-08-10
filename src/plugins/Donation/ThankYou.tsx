import React from 'react';

type Props = {
  selectedValue: number;
  donation: any;
  mobilization: any;
  widget: any;
  overrides: any;
  handleConvertDonation: any;
};

const Boleto = ({ donation }: any) => {
  const { boleto_barcode, boleto_url } = donation.gateway_data;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <code
        style={{
          background: '#f3f1f1',
          padding: '10px 20px',
          fontSize: '18px',
        }}
      >
        {boleto_barcode}
      </code>
      <a href={boleto_url} title="Clique aqui para abrir o boleto">
        Clique aqui para abrir o boleto
      </a>
    </div>
  );
};

const ThankYou = ({
  donation,
  widget,
  overrides,
  selectedValue,
  handleConvertDonation,
  ...ownProps
}: Props) => {
  const {
    settings: { finish_message_type: messageType },
  } = widget;
  const {
    FinishCustomMessage: { component: FinishCustomMessage, props: customProps },
    FinishDefaultMessage: {
      component: FinishDefaultMessage,
      props: defaultProps,
    },
    FinishDonationMessage: {
      component: FinishDonationMessage,
      props: donationProps,
    },
  } = overrides;

  // Renderizar o componente de Boleto
  if (donation.payment_method === 'boleto' && donation.gateway_data)
    return <Boleto donation={donation} />;

  if (messageType === 'custom')
    return <FinishCustomMessage {...ownProps} {...customProps} />;

  if (
    messageType === 'donation-recurrent' &&
    donation.payment_method !== 'boleto'
  ) {
    return (
      <FinishDonationMessage
        {...ownProps}
        {...donationProps}
        widget={widget}
        defaultSelectedValue={selectedValue}
        onClickDonate={(value?: any) => {
          if (value) {
            return handleConvertDonation({
              donation_id: donation.id,
              amount: widget.settings['donation_value' + value] + '00',
            });
          }
        }}
      />
    );
  }

  return (
    <FinishDefaultMessage {...ownProps} {...defaultProps} widget={widget} />
  );
};

export default ThankYou;
