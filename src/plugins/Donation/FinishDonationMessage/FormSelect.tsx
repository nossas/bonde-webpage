import React from 'react';
// import { FormattedMessage } from 'react-intl'

const FormSelect = (props: any) => {
  const {
    widget: { settings },
    mobilization: { header_font },
    onChange,
    value,
    onSubmit,
  } = props;

  const mainColor = (settings && settings.main_color) || '#54d0f6';

  const {
    donation_value1,
    donation_value2,
    donation_value3,
    donation_value4,
    donation_value5,
  } = settings;

  return (
    <div className="donation center clearfix">
      <h2
        className="p2 m0 white rounded-top"
        style={{
          fontFamily: header_font,
          backgroundColor: mainColor,
          fontWeight: 'bold',
        }}
      >
        OBA! Doação Realizada :)
        {/* <FormattedMessage
          id='widgets.components--donation.finish-post-donation.title-component'
          defaultMessage='OBA! Doação Realizada :)'
        /> */}
      </h2>
      <div className="p3" style={{ paddingTop: 0 }}>
        <div className="center clearfix p2">
          <b>
            {/* <FormattedMessage
              id='widgets.components--donation.finish-post-donation.improve-impact-question'
              defaultMessage='Quer aumentar seu impacto?'
            /> */}
            <p>Quer aumentar seu impacto?</p>
          </b>
          <br />
          <p>Torne essa doação recorrente!</p>
          {/* <FormattedMessage
            id='widgets.components--donation.finish-post-donation.improve-impact-solution'
            defaultMessage='Torne essa doação recorrente!'
          /> */}
        </div>
        <div
          className="center clearfix mb2"
          style={{
            fontSize: 14,
            color: 'gray',
          }}
        >
          <p>
            Sua contribuição será efetivada automaticamente uma vez ao mês,
            iniciando daqui há 31 dias.
          </p>
          {/* <FormattedMessage
            id='widgets.components--donation.finish-post-donation.improve-impact-explanation'
            defaultMessage='Sua contribuição será efetivada automaticamente uma vez ao mês, iniciando daqui há 31 dias.'
          /> */}
        </div>
        <div className="center clearfix">
          <select className="select mb2" onChange={onChange} value={value}>
            {donation_value1 && (
              <option value={1}>{`R$ ${donation_value1} /mês`}</option>
            )}
            {donation_value2 && (
              <option value={2}>{`R$ ${donation_value2} /mês`}</option>
            )}
            {donation_value3 && (
              <option value={3}>{`R$ ${donation_value3} /mês`}</option>
            )}
            {donation_value4 && (
              <option value={4}>{`R$ ${donation_value4} /mês`}</option>
            )}
            {donation_value5 && (
              <option value={5}>{`R$ ${donation_value5} /mês`}</option>
            )}
          </select>
          <button
            id="donate-btn"
            onClick={() => onSubmit(value)}
            className="btn col-12 p2 mb2"
            style={{
              backgroundColor: mainColor,
              color: 'white',
            }}
          >
            APOIAR TODO MÊS
            {/* <FormattedMessage
              id='widgets.components--donation.finish-post-donation.support-every-month'
              defaultMessage='APOIAR TODO MÊS'
            /> */}
          </button>
          <button
            id="not-now-btn"
            onClick={() => onSubmit()}
            className="btn col-12 p2"
          >
            AGORA NÃO
            {/* <FormattedMessage
              id='widgets.components--donation.finish-post-donation.not-now'
              defaultMessage='AGORA NÃO'
            /> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormSelect;
