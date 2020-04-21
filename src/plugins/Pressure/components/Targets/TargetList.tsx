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

const TargetList = ({ targets }: { targets: string[] }) => {
  const pressureType = pressureUtils.getType(targets);
  const isPressurePhone = pressureType === pressureUtils.PRESSURE_TYPE_PHONE;
  const targetsCount = targets.length;
  return (
    <Wrapper className="target-list px2 py1">
      <Label className="target-list-label bold">
        Quem você vai pressionar {targetsCount}{' '}
        {targetsCount > 1 ? 'alvos' : 'alvo'}
      </Label>
      <Container className="target-list-container clearfix">
        <ListWrapper className="target-list-wrapper clearfix">
          {targets.length > 0 &&
            targets.map((obj, index) => {
              const target = parseTarget(obj);
              return !target ? null : (
                <Item
                  key={`target-item-${index}`}
                  className="target-item left py1 px2 mr1 bg-white rounded"
                >
                  <p className="black h6 m0">
                    <Span className="target-name bold flex">{target.name}</Span>
                    {!isPressurePhone && (
                      <Span className="target-value">{target.value}</Span>
                    )}
                  </p>
                </Item>
              );
            })}
        </ListWrapper>
      </Container>
    </Wrapper>
  );
};

TargetList.defaultProps = {
  targets: [],
};

export default TargetList;
