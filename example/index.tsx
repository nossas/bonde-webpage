import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  Mobilization,
  PluggableWidget
  Styles
} from '../.';
import props from './data';

const plugins = [
  {
    kind: 'draft',
    component: () => <p>Olá</p>,
    options: { noOverlay: true },
  },
  {
    kind: 'form',
    component: () => <p>Form</p>,
  },
  {
    kind: 'donation',
    component: () => <p>Donation</p>,
  },
  {
    kind: 'pressure',
    component: () => <p>Pressure</p>,
  },
  {
    kind: 'pressure-phone',
    component: () => <p>Pressure Phone</p>,
  },
  {
    kind: 'content',
    component: () => <p>Content</p>,
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
    <Styles>
      <Mobilization {...newProps} widgetComponent={PluggableWidget} />
    </Styles>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
