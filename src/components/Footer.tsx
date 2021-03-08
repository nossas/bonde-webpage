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

const FooterStyled = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;

  padding: 0 100px;

  .flexable {
    display: flex;
    align-items: center;

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
    }
  }

  .signature {
    font-size: 16px;
    color: #000;
    margin-left: 15px;
  }
`;

const Image = styled.img`
  width: 56px;
  height: 56px;
`;

interface FooterProps {
  mobilization: {
    community: {
      image: string;
      signature: {
        name: string;
        url: string;
      };
    };
  };
}

const Footer: React.FC<FooterProps> = ({ mobilization }) => (
  <FooterStyled>
    {!!mobilization.community.signature ? (
      <div className="flexable">
        <a
          href={mobilization.community.signature.url}
          title={`Assinatura da comunidade ${mobilization.community.signature.name}`}
          target="_blank"
        >
          <Image
            src={mobilization.community.image}
            alt={mobilization.community.signature.name}
          />
          <span className="signature">
            Criado por {mobilization.community.signature.name}
          </span>
        </a>
      </div>
    ) : (
      <div />
    )}
    <div className="flexable">
      <Link
        href="/static/politica-de-privacidade.pdf"
        title="Política de Privacidade"
        target="_blank"
        rel="noopener noreferrer"
        style={{ marginRight: '30px' }}
      >
        Política de Privacidade
      </Link>
      <a
        href="http://www.bonde.org/?utm_source=footer-slogan"
        className="right"
        target="_blank"
        rel="noopener noreferrer"
        title="Feito pra causar. Feito com BONDE."
      >
        <BondeIcon />
      </a>
    </div>
  </FooterStyled>
);

export default Footer;
