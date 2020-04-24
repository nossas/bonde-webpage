import styled from 'styled-components';
import theme from '../../base/theme';

type HeaderProps = {
  backgroundColor: string;
  fontFamily: string;
};

export const Header = styled.h2<HeaderProps>`
  background-color: ${props => props.backgroundColor};
  font-family: ${props => props.theme.fontFamily};
  color: #fff;
  display: grid;
  justify-items: center;
  align-items: center;
  padding: 1rem 2rem;
  margin: 0;
  border-radius: 3px 3px 0 0;
  font-weight: 400;
`;

Header.defaultProps = {
  theme,
};
