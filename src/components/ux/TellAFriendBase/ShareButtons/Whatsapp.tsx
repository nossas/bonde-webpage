import React from 'react';
import { Wrap } from './styles';

const WhatsAppShareButton = ({ whatsappText }: { whatsappText: string }) => {
  const baseUrl = 'https://web.whatsapp.com/';

  return (
    <Wrap>
      <a
        href={`${baseUrl}send?text=${encodeURIComponent(whatsappText)}`}
        style={{ backgroundColor: '#4CEC68', color: '#fff' }}
        target="_blank"
      >
        Compartilhar no WhatsApp
      </a>
    </Wrap>
  );
};

export default WhatsAppShareButton;
