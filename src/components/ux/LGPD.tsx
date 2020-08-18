import React from 'react';
import styled from '@emotion/styled';

const Text = styled.span`
  display: block;
  background: #0000006b;
  color: #fff;
  font-size: 16px;
  text-align: left;
  padding: 15px 15px;
  margin: 1.5rem 0 1rem 0;
`;

export default () => (
  <Text>
    {`Ao clicar nesse botão, eu concordo em ter meus dados compartilhados com esta organização
      para que possam entregar minha assinatura. Aceito receber atualizações de campanha, pesquisas,
      petições e oportunidades de doação, conforme descrito na política de privacidade. Eu entendo
      que tenho o direito de cancelar o recebimento desses e-mails a qualquer momento.`}
  </Text>
);