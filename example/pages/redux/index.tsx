import * as React from 'react';
import { Provider } from "react-redux";
import configureStore from './configureStore'

export default ({ children }: any) => (
  <Provider store={configureStore()}>
    {children}
  </Provider>
)