import React from 'react';
import { BondeIcon } from '../icons';
// TODO: Remover dependencia dos componentes de tradução
// import { FormattedMessage } from 'react-intl';
import styled from '@emotion/styled';

const Link = styled.a`
  color: #000;
  line-height: 85px;
  text-decoration: none;
`;

const Divisor = styled.span`
  padding: 0 15px;
`;

const Footer = () => (
  <div id="footer" className="col-10 mx-auto">
    <div className="col col-10">
      <Link
        href="http://www.bonde.org/?utm_source=footer-logo"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>
          Feito pra causar. Feito com <strong>BONDE</strong>.
        </span>
      </Link>
      <Divisor>|</Divisor>
      <Link
        href="/static/termos-de-uso-e-politica-de-privacidade.pdf"
        title="Política de Privacidade"
        target="_blank"
        rel="noopener noreferrer"
      >
        Política de Privacidade
      </Link>
    </div>
    <div className="col col-2">
      <a
        href="http://www.bonde.org/?utm_source=footer-slogan"
        className="right my2"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BondeIcon />
      </a>
    </div>
  </div>
);

export default Footer;
