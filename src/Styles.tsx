import React from 'react';
import { Global, css } from '@emotion/core';

const layoutStyles = css`
  // Move to component style
  .flex {
    display: flex;
  }
  .flex-column {
    flex-direction: column;
  }
  .absolute {
    position: absolute;
  }
  .border {
    border: solid 1px;
  }
  .fixed {
    position: fixed;
  }

  // Mobile medias
  @media (min-width: 63.9em) {
    .md-hide {
      display: none;
    }
  }
  @media (min-width: 64em) {
    .lg-hide {
      display: none;
    }
  }
`;

const globalStyles = css`
  html {
    box-sizing: border-box;
  }

  body {
    -webkit-overflow-scrolling: touch;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Source Sans Pro', 'Proxima Nova', sans-serif;
    line-height: 1.5;
    margin: 0;
    padding: 0;
    min-height: 100vh;
    max-width: 100vw;
  }

  input:-webkit-autofill,
  textarea:-webkit-autofill,
  select:-webkit-autofill {
    background: #fff;
    -webkit-text-fill-color: $black !important;
    -webkit-box-shadow: 0 0 0 1000px white inset !important;
  }

  input,
  textarea,
  select {
    &:focus {
      outline: none;
    }
  }

  p {
    margin: 0;
  }

  ::-webkit-input-placeholder {
    color: $lightestGray;
  }
  :-moz-placeholder {
    color: $lightestGray;
  }
  ::-moz-placeholder {
    color: $lightestGray;
  }
  :-ms-input-placeholder {
    color: $lightestGray;
  }

  textarea {
    resize: none;
  }
`;

const Styles: React.FC = ({ children }) => (
  <>
    <Global styles={globalStyles} />
    <Global styles={layoutStyles} />
    {children}
  </>
);

export default Styles;
