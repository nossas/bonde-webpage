import styled from 'styled-components';

export const Wrap = styled.div`
  background-color: #ffffff;
  color: #222222;
  text-align: center;
  padding: 2rem;
  border-radius: 3px;
  & > p {
    margin: 1em 0;
  }
`;

type HeaderProps = {
  mainColor?: string;
};

export const Header = styled.h3<HeaderProps>`
  padding: 1rem;
  color: #fff;
  font-weight: 400;
  margin: 0;
  text-align: center;
  ${props => props.mainColor && `background-color: ${props.mainColor};`}
`;

export const IconWrapper = styled.div`
  padding: 1rem 0;
  color: #222222;
  text-align: center;
`;

export const WrapButtons = styled.div`
  display: grid;
  grid-row-gap: 1em;
`;
