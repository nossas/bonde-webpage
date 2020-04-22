import * as React from 'react';
import { Provider } from "react-redux";
import configureStore from './configureStore'

export default ({ children }) => (
  <Provider store={configureStore()}>
    {children}
  </Provider>
)