import React from 'react';
import { BondeIcon } from '../icons';
// TODO: Remover dependencia dos componentes de tradução
// import { FormattedMessage } from 'react-intl';
import styled from '@emotion/styled';

const Link = styled.a`
  color: #000;
  line-height: 85px;
  text-decoration: none;
  & > p > span {
    font-weight: bold;
  }
  &.made-with {
    @media (min-width: 768px) {
      display: flex;
      grid-column-gap: 5px;
    }
  }
`;

const StyledFooter = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const MadeWithBonde = styled.div`
  align-items: center;
  display: grid;
  grid-template-rows: auto auto;
  @media (min-width: 768px) {
    display: flex;
    grid-column-gap: 20px;
  }
`;

const WrapIcon = styled.div`
  justify-self: center;
  align-self: start;
  @media (min-width: 768px) {
    align-self: center;
    justify-self: end;
  }
`;

const WrapFooter = styled.div`
  width: 83.3333%;
  display: grid;
  grid-template-columns: 70% 30%;
  grid-column-gap: 20px;
  align-items: center;
`;

const Divisor = styled.span`
  display: none;
  @media (min-width: 768px) {
    display: initial;
    justify-self: center;
  }
`;

const Footer = () => (
  <StyledFooter>
    <WrapFooter>
      <MadeWithBonde>
        <Link
          href="http://www.bonde.org/?utm_source=footer-logo"
          target="_blank"
          rel="noopener noreferrer"
          className="made-with"
        >
          <p>Feito pra causar.</p>
          <p>
            Feito com <span>BONDE</span>.
          </p>
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
      </MadeWithBonde>
      <WrapIcon>
        <a
          href="http://www.bonde.org/?utm_source=footer-slogan"
          className="right my2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BondeIcon />
        </a>
      </WrapIcon>
    </WrapFooter>
  </StyledFooter>
);

export default Footer;
