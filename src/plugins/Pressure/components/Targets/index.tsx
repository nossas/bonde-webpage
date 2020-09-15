import React from 'react';
import { useField } from 'bonde-components';
import { pressureUtils, getTargetList } from '../../utils';
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
  pureTargets,
  pressureType,
}: {
  targets: string[];
  pureTargets?: any[];
  pressureType: string;
}) => {
  let group = { targets: targets.join(';') };
  const { input } = useField('targetsInput');
  if (pureTargets && pureTargets.length > 0) {
    // console.log('pureTargets', { pureTargets });
    const newGroup = pureTargets.filter(
      (t: any) => t.value === input.value.value
    )[0];
    if (newGroup) {
      group = newGroup;
    }
  }

  // console.log('Targets', { input });
  const newTargets = getTargetList(group.targets);
  const isPressurePhone = pressureType === pressureUtils.PRESSURE_TYPE_PHONE;
  const targetsCount = newTargets.length;

  return (
    <Wrapper>
      <Label>
        Quem você vai pressionar? ({targetsCount}{' '}
        {targetsCount > 1 ? 'alvos' : 'alvo'})
      </Label>
      <Container>
        <ListWrapper>
          {newTargets.length > 0 &&
            newTargets.map((obj, index) => {
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
