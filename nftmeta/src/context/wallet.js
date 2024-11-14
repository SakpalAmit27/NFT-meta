"use client";

import { createContext, useState } from "react";

// Create the context without `{children}` in `createContext`
export const WalletContext = createContext();

// Define the WalletProvider component to wrap children
export function WalletProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState(null);
  const [signer, setSigner] = useState();

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        setIsConnected,
        userAddress,
        setUserAddress,
        signer,
        setSigner,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
