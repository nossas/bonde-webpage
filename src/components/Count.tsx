import React from 'react';
import CountUp from 'react-countup';
import styled from 'styled-components';

type WrapperProps = {
  fontFamily?: string;
  shadow?: boolean;
};

const Wrapper = styled.div<WrapperProps>`
  font-family: ${props => props.fontFamily || 'inherit'};

  ${props =>
    props.shadow &&
    `
    box-shadow: rgb(227, 224, 227) 0px 15px 18px -10px inset;
    background-color: #fff;
    display: grid;
    justify-items: center;
    padding: 2rem;
    border-radius: 0 0 3px 3px;
  `}

  ${props =>
    !props.shadow &&
    `
    display: flex;
    flex-direction: row;
    padding: 1rem;
    justify-content: center;

    ${Title} {
      font-size: 1.25rem;
      margin: 0 5px;
      color: #fff!important;
      font-weight: normal;
    }
    ${Subtitle} {
      font-weight: normal;
      color: #fff!important;
    }
  `}

  & > div {
    transition: left 0.5s ease;
  }
`;

const Title = styled.h1<{ color: string }>`
  color: ${props => props.color}!important;
  font-weight: 300;
  font-size: 2.15rem;
  margin: 15px 0;
  font-family: inherit;
`;

const Subtitle = styled.h3`
  color: #111 !important;
  font-weight: 700;
  font-size: 1.25rem;
  margin: 0;
  text-align: center;
`;

type Props = {
  value: number;
  color: string;
  text: string;
  startCounting: boolean;
  fontFamily?: string;
  shadow?: boolean;
};

const Count = ({
  value,
  color,
  text,
  startCounting,
  fontFamily,
  shadow,
}: Props) => {
  return (
    <Wrapper fontFamily={fontFamily} shadow={shadow}>
      <Title color={color}>
        <CountUp
          start={0}
          end={!isNaN(value) && startCounting ? Number(value) : 0}
          duration={5}
        />
      </Title>
      <Subtitle>{text}</Subtitle>
    </Wrapper>
  );
};

Count.defaultProps = {
  value: 0,
  startCounting: false,
  shadow: false,
};

export default Count;
