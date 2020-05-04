import React from 'react';
import CountUp from 'react-countup';
import styled from 'styled-components';

const Wrapper = styled.div<{ fontFamily?: string }>`
  font-family: ${props => props.fontFamily || 'inherit'};
  box-shadow: rgb(227, 224, 227) 0px 15px 18px -10px inset;
  background-color: #fff;
  padding: 2rem;
  border-radius: 0 0 3px 3px;
  display: grid;
  justify-items: center;
  & > div {
    transition: left 0.5s ease;
  }
`;

const Title = styled.h1<{ color: string }>`
  color: ${props => props.color};
  font-weight: 300;
  font-size: 2.15rem;
  margin: 15px 0;
  font-family: inherit;
`;

const Subtitle = styled.h3`
  color: #111;
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
};

const Count = ({ value, color, text, startCounting, fontFamily }: Props) => {
  return (
    <Wrapper fontFamily={fontFamily}>
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
};

export default Count;
