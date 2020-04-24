// pages/_app.js
import React from "react";
// import { createStore } from "redux";
import { Provider } from "react-redux";
import App, { AppContext } from "next/app";
import withRedux, { ReduxWrapperAppProps } from "next-redux-wrapper";
import configureStore from './redux/configureStore'

class MyApp extends App<ReduxWrapperAppProps<any>> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    return {
      pageProps: {
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
      }
    };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }

}

export default withRedux(configureStore)(MyApp);
