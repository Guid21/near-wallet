import React from 'react';

import { utils, WalletConnection } from 'near-api-js';

import { Order } from '../types';

type MarketTableType = Readonly<{
  wallet?: WalletConnection;
  selectMarket?: string;
}>;

type Orders = Readonly<{
  ask_orders: Order[];
  bid_orders: Order[];
}>;

const MarketTable: React.FC<MarketTableType> = ({ wallet, selectMarket }) => {
  const [orders, setOrders] = React.useState<Orders | null>(null);

  React.useEffect(() => {
    if (selectMarket && RegExp(/^[0-9]+$/).test(selectMarket)) {
      wallet
        ?.account()
        ?.viewFunction('app_2.spin_swap.testnet', 'view_market', { market_id: +selectMarket })
        .then((orders: Orders) => setOrders(orders));
    } else {
      setOrders(null);
    }
  }, [wallet, selectMarket]);

  if (!wallet?.isSignedIn() || !orders) return null;

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {orders?.ask_orders.map((order, index) => (
            <tr key={index} className="text-lime-400">
              <th>{utils.format.formatNearAmount(order.price.toLocaleString('ru'), 5)}</th>
              <th>{utils.format.formatNearAmount(order.quantity.toLocaleString('ru'), 5)}</th>
            </tr>
          ))}
          {orders?.bid_orders.map((order, index) => (
            <tr key={index} className="text-rose-400">
              <th>{utils.format.formatNearAmount(order.price.toLocaleString('ru'), 5)}</th>
              <th>{utils.format.formatNearAmount(order.quantity.toLocaleString('ru'), 5)}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketTable;
