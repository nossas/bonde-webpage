import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  Styles,
  // Mobilization,
  // PluggableWidget,
  // DraftPlugin,
  // ContentEditor
} from '../.';
// import props from './data';
import BondePublic from './bonde-public';
import FetchMobilization from './FetchMobilization';
import MobilizationConnected from './components/MobilizationConnected';

// const plugins = [
//   {
//     kind: 'draft',
//     component: DraftPlugin,
//     options: { noOverlay: true },
//   },
//   {
//     kind: 'form',
//     component: () => <div>Formulário</div>,
//     options: DraftPlugin.setOptions({
//       label: 'Formulário',
//       icon: () => <i className="fa fa-list block white" />,
//       action: widget => {
//         console.log(`update widget ${widget.id}`);
//       },
//     }),
//   },
//   {
//     kind: 'donation',
//     component: () => <div>Doação</div>,
//     options: DraftPlugin.setOptions({
//       label: 'Doação',
//       icon: () => <div>Doação ícone</div>,
//       action: widget => {
//         console.log(`update widget ${widget.id}`);
//       },
//     }),
//   },
//   {
//     kind: 'pressure',
//     component: () => <div>Pressão</div>,
//     options: DraftPlugin.setOptions({
//       label: 'Pressão por e-mail',
//       icon: <i className="fa fa-money block white" />,
//       action: widget => {
//         console.log(`update widget ${widget.id}`);
//       },
//     }),
//   },
//   {
//     kind: 'pressure-phone',
//     component: () => <div>Pressão por telefone</div>,
//     options: DraftPlugin.setOptions({
//       label: 'Pressão por telefone',
//       icon: <i className="fa fa-money block white" />,
//       action: widget => {
//         console.log(`update widget ${widget.id}`);
//       },
//     }),
//   },
//   {
//     kind: 'content',
//     component: ContentEditor,
//     options: Object.assign(
//       {},
//       DraftPlugin.setOptions({
//         label: 'Texto',
//         icon: () => <i className="fa fa-font block white" />,
//         action: widget => {
//           console.log(`update widget ${widget.id}`);
//         },
//       }),
//       { noOverlay: true }
//     ),
//   },
// ];

// const newProps = {
//   ...props,
//   plugins: [...plugins],
//   extraWidgetProps: {
//     ...props.extraWidgetProps,
//     plugins: [...plugins],
//   },
// };

const App = () => {
  return (
    <BondePublic>
      <FetchMobilization customDomain='www.meurio.org.br'>
        <Styles>
          <MobilizationConnected />
        </Styles>
      </FetchMobilization>
    </BondePublic>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
