import React from 'react';
import styled from 'styled-components';
import theme from '../../../../base/theme';

// padding: 0 1.5rem;
const Wrapper = styled.div`
  font-family: ${props => props.theme.fontFamily};
  font-size: 0.8rem;
  text-transform: uppercase;
  color: #333333;
  padding: 0 1.5rem;
`;

Wrapper.defaultProps = {
  theme,
};

const OrdedList = styled.ol`
  text-align: left;
  padding-left: 1.5rem;
  font-size: 0.8rem;
  text-transform: none;
  margin-top: 0.5rem;
  color: #333333;
  display: grid;
  grid-row-gap: 0.4rem;
  font-family: inherit;
`;

const Item = styled.li`
  font-family: inherit;
`;

const HowItWorks = () => {
  return (
    <Wrapper>
      Como funciona?
      <OrdedList>
        <Item>Estamos ligando para o seu alvo</Item>
        <Item>Assim que alguém atender do lado de lá, vamos te ligar</Item>
        <Item>Quando você atender, conectamos as ligações</Item>
        <Item>Agora é com você!</Item>
      </OrdedList>
    </Wrapper>
  );
};

export default HowItWorks;
