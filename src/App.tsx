import React from 'react';

import './App.css';

import { Auth, Main } from './components';
import useConnect from './utils/near/useConnect';

function App() {
  const { wallet } = useConnect();

  return (
    <div className="artboard">
      <Auth wallet={wallet} />
      <Main wallet={wallet} />
    </div>
  );
}

export default App;
