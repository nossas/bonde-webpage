import React from 'react';
import { Button as Btn } from 'bonde-components';
import styled from '@emotion/styled';

const Button = styled(Btn)`
  && {
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
  toggleFinishMessage: any;
  buttonColor: any;
}) => {
  console.log('FinishButton', buttonColor);
  return (
    <Wrapper>
      <Button
        type="button"
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
