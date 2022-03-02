import React from 'react';

import { WalletConnection } from 'near-api-js';

import { Balance, MarketSelect, MarketTable } from '.';

type MainType = Readonly<{
  wallet?: WalletConnection;
}>;

const Main: React.FC<MainType> = ({ wallet }) => {
  const [selectMarket, setSelectMarket] = React.useState<string>();

  if (!wallet?.isSignedIn()) return null;

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content card w-96 bg-base-100 card-compact shadow-xl">
        <div className="card-body flex justify-center items-center">
          <h2 className="card-title">{wallet?.getAccountId()}</h2>
          <Balance wallet={wallet} />
          <MarketSelect {...{ wallet, setSelectMarket }} />
          <MarketTable {...{ wallet, selectMarket }} />
        </div>
      </div>
    </div>
  );
};

export default Main;
