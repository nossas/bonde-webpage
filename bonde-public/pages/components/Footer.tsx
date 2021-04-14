import React from 'react';
import BondeFooterIcon from './BondeFooterIcon';
// TODO: Remover dependencia dos componentes de tradução
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { Language } from 'bonde-webpages';

const Link = styled.a`
  color: #000;
  text-decoration: none;
`;

const Stack = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:first-child {
    justify-content: flex-start;
    margin-bottom: 25px;
  }

  @media (max-width: 767px) {
    width: 100%;

    &:first-child {
      .signature {
        display: inline-block;
        margin-left: 20px;
      }
    }
  }

  @media (min-width: 768px) {
    display: grid;
    grid-column-gap: 20px;
    grid-template-columns: auto auto;

    &:first-child {
      margin: 0;
    }
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

const Signature = ({ name, bonde }) => (
  <Language>
    {(locale) => locale === 'ptbr' ? (
      <span className="signature">Criado por {name} usando o {bonde}.</span>
    ) : locale === 'es' ? (
      <span className="signature">Creado por {name} usando {bonde}.</span>
    ) : null}
  </Language>
);

const Footer: React.FC<FooterProps> = ({ mobilization }) => {
  const trans = useTranslation();
  console.log('translationReturns', { trans });

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
        {trans.t("Welcome to React")}
        {/* {!!mobilization.community?.signature?.url ? (
          <Link
            href={mobilization.community?.signature?.url}
            title={`Assinatura da comunidade ${signatureName}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Signature name={signatureName} bonde={signatureBonde} />
          </Link>
        ) : (
            <Signature name={signatureName} bonde={signatureBonde} />
          )} */}
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
          <BondeFooterIcon />
        </Link>
      </Stack>
    </FooterStyled>
  );
};

export default Footer;
