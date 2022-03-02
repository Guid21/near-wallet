import React from 'react';

import { WalletConnection } from 'near-api-js';

type AuthType = Readonly<{
  wallet?: WalletConnection;
}>;

const Auth: React.FC<AuthType> = ({ wallet }) => {
  const handleSubmit = () => wallet?.requestSignIn();

  if (wallet?.isSignedIn()) return null;

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="flex-col hero-content lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">NEAR is here.</h1>
          <p className="py-6">Securely store and stake your NEAR tokens and compatible assets with NEAR Wallet.</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
