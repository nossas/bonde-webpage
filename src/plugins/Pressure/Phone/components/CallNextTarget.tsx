import React from 'react';
import { Button as Btn } from 'bonde-components';
import styled from 'styled-components';

const Button = styled(Btn)`
  && {
    border-radius: 2px;
    background-color: #40b4e5;
    max-width: 120px;
    &:hover {
      color: #fff;
    }
  }
`;
const CallNextTarget = ({
  listKey,
  name,
  addTwilioCallMutation,
}: {
  listKey: string;
  name: string;
  addTwilioCallMutation: any;
}) => {
  return (
    <li key={listKey}>
      <div>
        <span className="fa fa-phone-square primary" />
        <div>{name}</div>
      </div>
      <Button
        type="button"
        light
        onClick={(e: any) => {
          e.preventDefault();
          addTwilioCallMutation();
        }}
      >
        Ligar
      </Button>
    </li>
  );
};

export default CallNextTarget;
