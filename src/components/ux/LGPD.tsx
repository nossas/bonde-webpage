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
      {`Al hacer clic en este botón, aceptas recibir correos electrónicos con actualizaciones sobre las campañas de All Out, según se describe en su `}
      <a
        href="https://allout.org/es/politica-de-privacidad"
        title="Política de Privacidad"
        target="_blank"
        rel="noopener noreferrer"
      >
        Política de Privacidad
      </a>
      {`. Tienes el derecho a cancelar tu suscripción a estos correos electrónicos en cualquier momento.`}
    </Text>
  );
};
