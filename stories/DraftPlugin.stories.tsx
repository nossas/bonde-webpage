import React from 'react';
// import { action } from '@storybook/addon-actions';
import { DraftPlugin, DraftProps } from '../src';

export const Draft = () => <DraftPlugin {...DraftProps} />;

export default {
  title: 'DraftPlugin',
};
