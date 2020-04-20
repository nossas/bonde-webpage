import React from 'react';
// import { action } from '@storybook/addon-actions';
import { ContentEditor, ContentProps } from '../src';

export const Content = () => <ContentEditor {...ContentProps} />;

export default {
  title: 'Content',
};
