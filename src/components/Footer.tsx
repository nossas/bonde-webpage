import React from 'react';
import { BondeIcon } from '../icons';
// TODO: Remover dependencia dos componentes de tradução
// import { FormattedMessage } from 'react-intl';

const Footer = () => (
  <div id="footer" className="col-10 mx-auto">
    <div className="col col-8">
      <a
        href="http://www.bonde.org/?utm_source=footer-logo"
        style={{ color: '#000', textDecoration: 'none', lineHeight: '85px' }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>
          Feito pra causar. Feito com <strong>BONDE</strong>.
        </span>
      </a>
    </div>
    <div className="col col-3" style={{ textAlign: 'right' }}>
      <a
        href="/static/termos-de-uso-e-politica-de-privacidade.pdf"
        style={{ color: '#000', lineHeight: '85px' }}
        target="_blank"
        rel="noopener noreferrer"
      >
        Politica de Privacidade
      </a>
    </div>
    <div className="col col-1">
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
