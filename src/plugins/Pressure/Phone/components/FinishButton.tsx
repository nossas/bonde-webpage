import React from 'react';
import { Button as Btn } from 'bonde-components';
import styled from '@emotion/styled';

const Button = styled(Btn)`
  && {
    background-color: ${props => props.backgroundColor};
    border-radius: 2px;
    width: 100%;
  }
`;
const Wrapper = styled.div`
  margin: 1rem 0;
`;
const FinishButton = ({
  buttonColor,
  toggleFinishMessage,
}: {
  buttonColor: string;
  toggleFinishMessage: any;
}) => {
  return (
    <Wrapper>
      <Button
        type="button"
        backgroundColor={buttonColor}
        onClick={(e: any) => {
          e.preventDefault();
          return toggleFinishMessage(true);
        }}
      >
        Encerrar e compartilhar
      </Button>
    </Wrapper>
  );
};

export default FinishButton;
