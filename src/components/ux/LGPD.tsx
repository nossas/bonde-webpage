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
`;

export default ({ color }: any) => {
  return (
    <Text color={color}>
      {`Ao clicar nesse botão, eu concordo em ter meus dados compartilhados com esta organização
        para que possam entregar minha assinatura. Aceito receber atualizações de campanha, pesquisas,
        petições e oportunidades de doação, conforme descrito na política de privacidade. Eu entendo
        que tenho o direito de cancelar o recebimento desses e-mails a qualquer momento.`}
    </Text>
  );
};
