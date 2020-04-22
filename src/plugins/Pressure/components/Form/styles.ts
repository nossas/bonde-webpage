import styled from 'styled-components';

export const Wrapper = styled.div`
  && {
    label {
      font-family: ${props => props.theme.fontFamily};
      line-height: 1.5;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      margin-bottom: 0;
      font-size: 0.75rem;
      font-weight: 600;
      color: #aaa;
      text-transform: none;
      letter-spacing: 0;
    }

    textarea,
    input {
      border: none;
      padding: 0px;
      height: 2rem;
      outline: none;
      font-size: 0.9rem;
      width: 100%;

      &:focus {
        outline-offset: -2px;
      }

      &::placeholder {
        color: #ccd3e2;
      }
      &::-webkit-input-placeholder {
        color: #ccd3e2;
      }
      &::-moz-placeholder {
        color: #ccd3e2;
      }
      &:-ms-input-placeholder {
        color: #ccd3e2;
      }
      &:-moz-placeholder {
        color: #ccd3e2;
      }

      span {
        font-family: ${props => props.theme.fontFamily};
        font-size: 0.75rem;
        line-height: 1.5;
        margin-left: 0.5rem;
        font-weight: 700;
      }
    }

    textarea {
      height: 7rem;
    }
  }
`;

type ButtonProps = {
  color?: string;
};

export const ButtonWrapper = styled.div<ButtonProps>`
  && {
    button {
      letter-spacing: 0;
      color: #fff;
      text-transform: uppercase;
      border-radius: 3px;
      text-decoration: none;
      width: 100%;

      font-family: inherit;
      font-size: inherit;
      font-weight: 700;
      cursor: pointer;
      line-height: 1.125rem;
      height: auto;

      padding: 1rem 0;

      &:hover {
        text-decoration: none;
      }
    }
  }
`;
