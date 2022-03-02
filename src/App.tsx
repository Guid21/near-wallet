import React from 'react';

import './App.css';

import { Auth, Main } from './components';
import useConnect from './utils/near/useConnect';

function App() {
  // в последний момент вспомнил что забыл добавить sign out, и ничего умнее не придумал /=
  const [randomKey, setRandomKey] = React.useState(0);
  const { wallet } = useConnect();

  return (
    <div className="artboard" key={randomKey}>
      <Auth wallet={wallet} />
      <Main wallet={wallet} setRandomKey={setRandomKey} />
    </div>
  );
}

export default App;
