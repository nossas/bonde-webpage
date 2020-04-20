import styled from 'styled-components';

export const Wrapper = styled.div`
  & .reboo-editor {
    .toolbar {
      z-index: 4;
      position: absolute;
      top: 0;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.5);

      .active {
        background-color: rgba(0, 0, 0, 0.25);
      }
    }

    .toolbarButton {
      float: left;
      text-decoration: none;
      cursor: pointer;
      display: inline-block;
      line-height: 1.125rem;
      height: auto;
      vertical-align: middle;
      -webkit-appearance: none;
      color: inherit;
      background-color: transparent;
      padding: 0.5rem 1rem;
      margin: 0px;
      border-width: 1px;
      border-style: solid;
      border-color: transparent;
    }
  }
`;
