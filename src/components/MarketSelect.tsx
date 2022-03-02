import React from 'react';

import { WalletConnection } from 'near-api-js';

import { Market } from '../types';

type MarketsType = Readonly<{
  wallet?: WalletConnection;
  setSelectMarket: React.Dispatch<React.SetStateAction<string | undefined>>;
}>;

const Markets: React.FC<MarketsType> = ({ wallet, setSelectMarket }) => {
  const [markets, setMarkets] = React.useState<Market[]>();

  const handleSelectMarket: React.ChangeEventHandler<HTMLSelectElement> = (e) => setSelectMarket(e.target.value);

  React.useEffect(() => {
    wallet
      ?.account()
      ?.viewFunction('app_2.spin_swap.testnet', 'markets', {})
      .then((markets: Market[]) => setMarkets(markets));
  }, [wallet]);

  if (!wallet?.isSignedIn()) return null;

  return (
    <select className="select w-full max-w-xs select-bordered w-full mt-6" onChange={handleSelectMarket}>
      <option value="">-</option>
      {markets?.map(({ id, base, quote }) => (
        <option key={id} value={id}>
          {base.ticker}/{quote.ticker}
        </option>
      ))}
    </select>
  );
};

export default Markets;
