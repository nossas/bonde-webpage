import axios from 'axios';
import { MakeStore } from 'next-redux-wrapper';
import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import apiClient from './apiClient';
import createReducer, { sourceReqCreateReducer } from './createReducer';
import { intl as intlClient } from './intlReducer';

const middlewares = [
  promise,
  thunk.withExtraArgument({
    intl: intlClient,
    api: apiClient,
    axios,
  }),
];

const configureStore: MakeStore = (initialState = {}, options?: any) => {
  const request = {
    host: '',
    protocol: 'http',
  };

  if (options && options.req && options.req.headers) {
    const { headers } = options.req;
    request.host = headers.host || request.host;
    request.protocol = headers['x-forwarded-proto'] || request.protocol;
  }

  return createStore(
    createReducer({
      sourceRequest: sourceReqCreateReducer(request),
    }),
    initialState,
    compose(applyMiddleware(...middlewares))
  );
};

export default configureStore;
