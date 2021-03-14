import React from 'react';
import ReactDOM from 'react-dom';

declare global {
  interface Window {
    web3: any;
  }
}

import { App } from './App';

ReactDOM.render(<App />, document.getElementById('root'));
