import React from 'react';
import { BondeIcon } from '../icons';
// TODO: Remover dependencia dos componentes de tradução
// import { FormattedMessage } from 'react-intl';

const linkStyles = {
  color: '#000',
  lineHeight: '85px',
  textDecoration: "none"
}

const divisorStyles = {
  padding: '0 15px'
}

const Footer = () => (
  <div id="footer" className="col-10 mx-auto">
    <div className="col col-10">
      <a
        href="http://www.bonde.org/?utm_source=footer-logo"
        style={linkStyles}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>
          Feito pra causar. Feito com <strong>BONDE</strong>.
        </span>
      </a>
      <span style={divisorStyles}>|</span>
      <a
        href="/static/termos-de-uso-e-politica-de-privacidade.pdf"
        title="Politica de Privacidade"
        style={linkStyles}
        target="_blank"
        rel="noopener noreferrer"
      >
        Politica de Privacidade
        </a>
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
