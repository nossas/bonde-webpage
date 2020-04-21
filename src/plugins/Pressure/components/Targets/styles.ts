import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: #eeeeee;
`;

export const Label = styled.div`
  color: #4c4c4c;
  font-size: 0.8em;
  margin-top: 5px;
  margin-bottom: 12px;
`;

export const Container = styled.div`
  overflow-x: auto;
`;

export const ListWrapper = styled.div`
  display: flex;
`;

export const Item = styled.label`
  display: flex;
  align-items: flex-start;

  input[type='checkbox'] {
    margin: 0.25rem 0.8rem;
    margin-left: 0;
  }

  & > p {
    font-size: 0.8rem;
  }
`;

export const Span = styled.span`
  white-space: nowrap;
`;
