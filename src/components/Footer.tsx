import React from 'react';
import { BondeIcon } from '../icons';
// TODO: Remover dependencia dos componentes de tradução
// import { FormattedMessage } from 'react-intl';
import styled from '@emotion/styled';

const Link = styled.a`
  color: #000;
  text-decoration: none;
`;

const Stack = styled.div`
  display: flex;
  justify-content: space-between;

  @media (min-width: 768px) {
    display: grid;
    grid-column-gap: 20px;
    grid-template-columns: auto auto;
  }
`

const FooterStyled = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 20px calc((100% - 83.33333%) / 2);

  @media (max-width: 767px) {
    flex-direction: column;
    padding: 20px 30px;
    align-items: flex-start;
  }

  .signature {
    font-size: 16px;
    color: #000;
    margin-left: 15px;
  }
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
`;

export interface FooterProps {
  mobilization: {
    community: {
      name: string;
      image: string;
      signature?: {
        name?: string;
        url?: string;
      };
    };
  };
}

const Footer: React.FC<FooterProps> = ({ mobilization }) => {
  const signatureName: string =
    mobilization.community?.signature?.name || mobilization.community.name;

  const signatureBonde = 
    <Link href="http://bonde.org" target="_blank"><b>BONDE</b></Link>;
  
  return (
    <FooterStyled>
      <Stack>
        {mobilization.community.image && (
          <Image src={mobilization.community.image} alt={signatureName} />
        )}
        {!!mobilization.community?.signature?.url ? (
          <Link
            href={mobilization.community?.signature?.url}
            title={`Assinatura da comunidade ${signatureName}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="signature">Feito por {signatureName} usando o {signatureBonde}.</span>
          </Link>
        ) : (
          <span className="signature">Feito por {signatureName} usando o {signatureBonde}.</span>
        )}
      </Stack>
      <Stack>
        <Link
          href="/static/politica-de-privacidade.pdf"
          title="Política de Privacidade"
          target="_blank"
          rel="noopener noreferrer"
        >
          Política de Privacidade
        </Link>
        <Link
          href="http://www.bonde.org/?utm_source=footer-slogan"
          title="Feito pra causar. Feito com BONDE."
          rel="noopener noreferrer"
          target="_blank"
        >
          <BondeIcon />
        </Link>
      </Stack>
    </FooterStyled>
  );
};

export default Footer;
