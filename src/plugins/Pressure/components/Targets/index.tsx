import React from 'react';
import { pressureUtils } from '../../utils';
import { Wrapper, Label, Container, ListWrapper, Item, Span } from './styles';

const parseTarget = (target: string) => {
  const targetSplit = target.split('<');
  const valid = targetSplit.length === 2;
  return valid
    ? { name: targetSplit[0].trim(), value: targetSplit[1].replace('>', '') }
    : null;
};

const Targets = ({
  targets,
  pressureType,
}: {
  targets: string[];
  pressureType: string;
}) => {
  const isPressurePhone = pressureType === pressureUtils.PRESSURE_TYPE_PHONE;
  const targetsCount = targets.length;
  return (
    <Wrapper>
      <Label>
        Quem você vai pressionar? ({targetsCount}{' '}
        {targetsCount > 1 ? 'alvos' : 'alvo'})
      </Label>
      <Container>
        <ListWrapper>
          {targets.length > 0 &&
            targets.map((obj, index) => {
              const target = parseTarget(obj);
              return !target ? null : (
                <Item key={`target-item-${index}`}>
                  <p>
                    <Span>{target.name}</Span>
                    {!isPressurePhone && <Span>{target.value}</Span>}
                  </p>
                </Item>
              );
            })}
        </ListWrapper>
      </Container>
    </Wrapper>
  );
};

Targets.defaultProps = {
  targets: [],
};

export default Targets;
