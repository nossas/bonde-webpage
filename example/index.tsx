import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Mobilization, PluggableWidget, DraftPlugin, Money } from '../.';
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
      icon: () => <Money />,
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

const App = () => {
  return (
    <div>
      <Mobilization {...newProps} widgetComponent={PluggableWidget} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
