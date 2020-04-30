import React from 'react';
import styled from '@emotion/styled';

const DonationFormStyles = styled.div`
  text-align: center;

  h2 {
    padding: 1rem;
    color: #fff;
    border-radius: 3px 3px 0 0;
    font-weight: 400;
    margin: 0;
  }

  .donation-form {
    position: relative;
    padding: 2rem;
  }

  &:after,
  &:before {
    content: ' ';
    display: table;
  }
`;

type Props = {
  title: string;
  headerFont: string;
  mainColor: string;
};

const DonationForm: React.FC<Props> = ({
  children,
  title,
  headerFont,
  mainColor,
}) => {
  const titleStyle = { fontFamily: headerFont, backgroundColor: mainColor };

  return (
    <DonationFormStyles>
      <h2 style={titleStyle}>{title}</h2>
      <div className="donation-form">{children}</div>
    </DonationFormStyles>
  );
};

export default DonationForm;
