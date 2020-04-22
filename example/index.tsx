import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Styles } from '../.';
import BondePublic from './bonde-public';
import FetchMobilization from './FetchMobilization';
import MobilizationConnected from './components/MobilizationConnected';

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
