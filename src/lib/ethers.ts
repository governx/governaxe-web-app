import * as React from "react";
import { type WalletClient, useWalletClient } from "wagmi";
import { providers } from "ethers";

export function walletClientToWeb3Provider(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new providers.Web3Provider(transport, network);
  //   const signer = provider.getSigner(account.address)
  return provider;
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useWeb3Provider({ chainId }: { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId });
  return React.useMemo(
    () => (walletClient ? walletClientToWeb3Provider(walletClient) : undefined),
    [walletClient]
  );
}
