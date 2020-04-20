import React from 'react';
import { Wrapper, StyledButton, Content } from './styles';

const Button = ({
  children,
  label,
  onClick,
}: {
  label: string;
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  children: React.ReactNode;
}) => {
  // TODO: Renderizar icone quando coluna estiver reduzida
  return (
    <Wrapper className="draft-widget-button col col-4 p1">
      <StyledButton title={label} className="col-12" onClick={onClick}>
        <Content>{children}</Content>
      </StyledButton>
    </Wrapper>
  );
};

export default Button;
