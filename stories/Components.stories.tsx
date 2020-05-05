import React from 'react';
import { Targets, Count } from '../src';
import PressureProps from './mocks/plugin/pressure';

export const TargetList = () => {
  return <Targets targets={PressureProps.targetList} pressureType={'email'} />;
};

export const CountContainer = () => {
  return (
    <Count
      value={PressureProps.widget.count || 0}
      color={PressureProps.widget.settings.main_color}
      text={'pressões'}
      startCounting={true}
    />
  );
};

export default {
  title: 'Components',
};
