import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Mobilization, PluggableWidget } from '../.';
import props from './data';

const plugins = [
  {
    kind: 'draft',
    component: () => <p>Olá</p>,
    options: { noOverlay: true },
  },
  {
    kind: 'form',
    component: props => (
      // <FormPlugin
      //   {...props}
      //   analyticsEvents={FormAnalytics}
      //   overrides={{
      //     FinishCustomMessage: { component: FinishMessageCustom },
      //     FinishDefaultMessage: {
      //       component: FormTellAFriend,
      //       props: { imageUrl, href: getSharedPath(props.mobilization) },
      //     },
      //   }}
      // />
    ),
  },
  {
    kind: 'donation',
    component: () => <p>Olá</p>,
  },
  {
    kind: 'pressure',
    component: () => <p>Olá</p>,
  },
  {
    kind: 'pressure-phone',
    component: () => <p>Olá</p>,
  },
  {
    kind: 'content',
    component: () => <p>Olá</p>,
  },
];

const newProps = {
  ...props,
  plugins: [...plugins],
  extraWidgetProps: {
    ...props.extraWidgetProps,
    plugins: [...plugins],
  },
};

const App = () => {
  return (
    <div>
      <Mobilization {...newProps} widgetComponent={PluggableWidget} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
