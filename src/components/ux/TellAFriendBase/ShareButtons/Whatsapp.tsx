import PropTypes from 'prop-types';
import React from 'react';

const WhatsAppShareButton = ({ whatsappText }: any) => {
  const baseUrl = 'https://web.whatsapp.com/';

  return (
    <a
      className="btn white h3 p3 col-12 caps h5 rounded border-box"
      href={`${baseUrl}send?text=${encodeURIComponent(whatsappText)}`}
      style={{ backgroundColor: '#4CEC68', color: '#fff' }}
    >
      Compartilhar no WhatsApp
    </a>
  );
};

WhatsAppShareButton.propTypes = {
  whatsappText: PropTypes.string,
};

export default WhatsAppShareButton;
