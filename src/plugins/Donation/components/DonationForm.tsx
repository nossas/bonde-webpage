import React from 'react';
import styled from '@emotion/styled';

type DonationFormStylesProps = {
  mainColor: string;
};

const DonationFormStyles = styled.div<DonationFormStylesProps>`
  text-align: center;

  h2 {
    padding: 1rem;
    color: #fff;
    border-radius: 3px 3px 0 0;
    font-weight: 400;
    margin: 0;
    background-color: ${props => props.mainColor};
  }

  .donation-form {
    position: relative;
    padding: 2rem;
  }

  .btn-submit {
    width: 100%;
    padding: 1rem;
    color: #fff;
    text-transform: uppercase;
    background-color: ${props => props.mainColor};
    font-weight: bold;
    border: none;
    border-radius: 3px;
    margin-top: 0.5rem;
    cursor: pointer;

    &:focus {
      outline: none;
    }
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
  buttonText: string;
  onClickDonate: any;
  loading: boolean;
};

const DonationForm: React.FC<Props> = ({
  children,
  title,
  headerFont,
  mainColor,
  buttonText,
  onClickDonate,
  loading,
}) => (
  <DonationFormStyles mainColor={mainColor}>
    <h2 style={{ fontFamily: headerFont }}>{title}</h2>
    <div className="donation-form">
      {children}
      <button
        className="btn-submit"
        type="button"
        onClick={onClickDonate}
        disabled={loading}
      >
        {buttonText}
      </button>
    </div>
  </DonationFormStyles>
);

export default DonationForm;
