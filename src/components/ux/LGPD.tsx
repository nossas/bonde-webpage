import React from 'react';
import styled from '@emotion/styled';

type Props = {
  color?: string;
};

const Text = styled.span<Props>`
  display: block;
  background: none;
  color: ${props => props.color || '#fff'};
  font-size: 14px;
  text-align: left;
  margin: 1.5rem 0 1rem 0;

  a {
    color: ${props => props.color || '#fff'};
  }
`;

export default ({ color }: any) => {
  return (
    <Text color={color}>
      {`Ao participar desta campanha, você concorda em ter seus dados compartilhados com os organizadores dessa campanha e aceita receber emails de atualização, conforme descrito na `}
      <a
        href="/static/politica-de-privacidade.pdf"
        title="Politica de Privacidade"
        target="_blank"
        rel="noopener noreferrer"
      >
        política de privacidade
      </a>
      {` desse site. No entanto, você também tem o direito de cancelar o recebimento desses e-mails a qualquer momento.`}
    </Text>
  );
};
