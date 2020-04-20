import styled from 'styled-components';

export const Wrapper = styled.div``;

export const StyledButton = styled.button`
  border: 1px solid #222222;
  color: #999999;
  border-radius: 2px;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  height: 100px;
  transition: 0.3s;
  position: relative;

  &:hover {
    background-color: rgba(255, 255, 255, 0.02);
  }
`;

export const Content = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  i.fa {
    font-size: 2rem;
    position: relative;
    margin-bottom: 5px;
  }
`;

export const DraftWidget = styled.div`
  background-color: rgba(0, 0, 0, 0.89);
  padding: 2.8rem;
  & .title {
    color: #999999;
    margin-bottom: 1.5rem;
  }
`;

export const DraftWidgetPublic = styled.div`
  min-height: 320px;
`;
