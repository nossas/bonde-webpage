import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {
  Main,
  Body,
  // Validators
} from 'bonde-components';
import { Mobilization, PluggableWidget, DraftPlugin } from '../.';
import props from './data';

const plugins = [
  {
    kind: 'draft',
    component: DraftPlugin,
    options: { noOverlay: true },
  },
  {
    kind: 'form',
    component: () => <div>Formulário</div>,
    options: DraftPlugin.setOptions({
      label: 'Formulário',
      icon: () => <i className="fa fa-list block white" />,
      action: widget => {
        console.log(`update widget ${widget.id}`);
      },
    }),
  },
  {
    kind: 'donation',
    component: () => <div>Doação</div>,
    options: DraftPlugin.setOptions({
      label: 'Doação',
      icon: () => <div>Doação ícone</div>,
      action: widget => {
        console.log(`update widget ${widget.id}`);
      },
    }),
  },
  {
    kind: 'pressure',
    component: () => <div>Pressão</div>,
    options: DraftPlugin.setOptions({
      label: 'Pressão por e-mail',
      icon: <i className="fa fa-money block white" />,
      action: widget => {
        console.log(`update widget ${widget.id}`);
      },
    }),
  },
  {
    kind: 'pressure-phone',
    component: () => <div>Pressão por telefone</div>,
    options: DraftPlugin.setOptions({
      label: 'Pressão por telefone',
      icon: <i className="fa fa-money block white" />,
      action: widget => {
        console.log(`update widget ${widget.id}`);
      },
    }),
  },
  {
    kind: 'content',
    component: () => <div>Conteúdo</div>,
    options: Object.assign(
      {},
      DraftPlugin.setOptions({
        label: 'Texto',
        icon: () => <i className="fa fa-font block white" />,
        action: widget => {
          console.log(`update widget ${widget.id}`);
        },
      }),
      { noOverlay: true }
    ),
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

const Routing = () => {
  return (
    <Main>
      <Body>
        <Link to="/">Navigate to page mobilization</Link>
        <Switch>
          <Route exact path="/">
            <div>
              <Mobilization {...newProps} widgetComponent={PluggableWidget} />
            </div>
          </Route>
        </Switch>
      </Body>
    </Main>
  );
};

const App = () => {
  return (
    <Router>
      <Routing />
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
