import React from 'react';

import { WalletConnection, utils } from 'near-api-js';
import { AccountBalance } from 'near-api-js/lib/account';

type BalanceType = Readonly<{
  wallet?: WalletConnection;
}>;

const Balance: React.FC<BalanceType> = ({ wallet }) => {
  const [balance, setBalance] = React.useState<AccountBalance>();

  React.useEffect(() => {
    wallet
      ?.account()
      .getAccountBalance()
      .then((balance) => setBalance(balance));
  }, [wallet]);

  if (!wallet?.isSignedIn()) return null;

  return (
    <div className="stat-value text-primary">
      {balance?.available ? utils.format.formatNearAmount(balance?.available, 5) : '-'} NEAR
    </div>
  );
};

export default Balance;
