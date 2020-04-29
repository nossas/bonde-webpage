import styled from 'styled-components';
import theme from '../../../../base/theme';

export const WrapInputs = styled.div<{ disabled?: boolean }>`
  padding: 1rem 2rem 0.5rem;
  border-bottom: 1px solid #eee;
  & > div {
    padding: 0;
  }
  &:last-child {
    border-bottom: none;
  }
  ${props =>
    props.disabled &&
    `
      && {
        input, textarea {
          color: rgb(84, 84, 84);
          cursor: default;
          background-color: rgb(235, 235, 228);
        }
      }
    `}
`;

export const Wrapper = styled.div`
  font-family: ${props => props.theme.fontFamily};
  && {
    label {
      line-height: 1.5;
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
  padding: 0.5rem 2rem 2rem;
  && {
    button {
      letter-spacing: 0;
      color: #fff;
      text-transform: uppercase;
      border-radius: 3px;
      text-decoration: none;
      width: 100%;
      ${props =>
        props.color &&
        `
        background-color: ${props.color};
        border-color: ${props.color};
      `}

      font-family: ${props => props.theme.fontFamily};
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

ButtonWrapper.defaultProps = {
  theme,
};

export const Error = styled.span`
  color: red;
  font-weight: 700;
  padding: 1rem 2rem 0.5rem;
  font-size: 13px;
  text-align: center;
  font-family: ${props => props.theme.fontFamily};
`;

Error.displayName = 'Error';

Error.defaultProps = {
  theme,
};
