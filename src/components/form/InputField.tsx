import React from 'react';
import { InputField as Input } from 'bonde-components';
import styled from 'styled-components';

const Wrapper = styled.div`
  && {
    label {
      font-family: inherit;
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
        color: #f7f3ed;
      }
      &::-webkit-input-placeholder {
        color: #f7f3ed;
      }
      &::-moz-placeholder {
        color: #f7f3ed;
      }
      &:-ms-input-placeholder {
        color: #f7f3ed;
      }
      &:-moz-placeholder {
        color: #f7f3ed;
      }

      span {
        font-family: inherit;
        font-size: 0.75rem;
        line-height: 1.5;
        margin-left: 0.5rem;
        font-weight: 700;
      }
    }
  }
`;

const InputField = (props: any) => (
  <Wrapper>
    <Input {...props} />
  </Wrapper>
);

export default InputField;
