import React from 'react';
// import { action } from '@storybook/addon-actions';
import { ContentEditor, ContentProps } from '../src';

export const Content = () => (
  <ContentEditor
    {...ContentProps}
    handleSave={() => console.log('save')}
    handleDelete={() => console.log('delete')}
  />
);

export default {
  title: 'Content',
};
