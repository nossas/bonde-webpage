import React from 'react';
// import { action } from '@storybook/addon-actions';
import {
  FormPlugin,
  FinishMessageCustom,
  FormTellAFriend,
  FormAnalytics,
  asyncFormEntryCreate,
} from '../src';
import FormProps from './mocks/plugin/form';

export const Form = () => {
  return (
    <FormPlugin
      {...FormProps}
      asyncFormEntryCreate={asyncFormEntryCreate}
      analyticsEvents={FormAnalytics}
      overrides={{
        FinishCustomMessage: {
          component: FinishMessageCustom,
          props: { ...FormProps },
        },
        FinishDefaultMessage: {
          component: FormTellAFriend,
          props: { ...FormProps },
        },
      }}
    />
  );
};

export default {
  title: 'FormPlugin',
};
