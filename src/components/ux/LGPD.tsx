import React from 'react';
import styled from '@emotion/styled';

type Props = {
  bgColor?: string;
};

const Text = styled.span<Props>`
  display: block;
  background: ${props => props.bgColor || '#0000006b'};
  color: #fff;
  font-size: 16px;
  text-align: left;
  padding: 15px 15px;
  margin: 1.5rem 0 1rem 0;
`;

export default ({ widget }: any) => {
  return (
    <Text bgColor={widget.settings.main_color}>
      {`Ao clicar nesse botão, eu concordo em ter meus dados compartilhados com esta organização
        para que possam entregar minha assinatura. Aceito receber atualizações de campanha, pesquisas,
        petições e oportunidades de doação, conforme descrito na política de privacidade. Eu entendo
        que tenho o direito de cancelar o recebimento desses e-mails a qualquer momento.`}
    </Text>
  );
};
