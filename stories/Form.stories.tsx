import React from 'react';
// import { action } from '@storybook/addon-actions';
import {
  FormPlugin,
  FinishMessageCustom,
  FormTellAFriend,
  FormAnalytics,
  FormProps,
  asyncFormEntryCreate,
} from '../src';

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
