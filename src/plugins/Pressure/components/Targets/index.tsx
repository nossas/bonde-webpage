import React from 'react';
import { useField } from 'bonde-components';
import { pressureUtils } from '../../utils';
import { Wrapper, Label, Container, ListWrapper, Item, Span } from './styles';

const parseTarget = (target: string) => {
  const targetSplit = target.split('<');
  const valid = targetSplit.length === 2;
  return valid
    ? { name: targetSplit[0].trim(), value: targetSplit[1].replace('>', '') }
    : null;
};

export type GroupTarget = {
  identify: string;
  label: string;
  targets: string[];
  email_subject?: string;
  email_body?: string;
};

const Targets = ({
  targets,
  pureTargets,
  pressureType,
}: {
  targets: string[];
  pureTargets?: GroupTarget[];
  pressureType: string;
}) => {
  let groupTarget: Pick<GroupTarget, 'targets'> = { targets };
  const { input } = useField('targetsInput');
  if (pureTargets && pureTargets.length > 0) {
    // console.log('pureTargets', { pureTargets });
    const newGroup: GroupTarget = pureTargets.filter(
      (t: GroupTarget) => t.identify === input.value.value
    )[0];
    if (newGroup) {
      groupTarget = newGroup;
    }
  }

  // console.log('Targets', { input });
  const newTargets = groupTarget.targets;
  const isPressurePhone = pressureType === pressureUtils.PRESSURE_TYPE_PHONE;
  const targetsCount = newTargets.length;

  return targetsCount > 0 ? (
    <Wrapper>
      <Label>
        Quem você vai pressionar? ({targetsCount}{' '}
        {targetsCount > 1 ? 'alvos' : 'alvo'})
      </Label>
      <Container>
        <ListWrapper>
          {newTargets.map((obj: string, index) => {
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
  ) : null;
};

Targets.defaultProps = {
  targets: [],
};

export default Targets;
