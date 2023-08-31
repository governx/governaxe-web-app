import { configureChains } from "wagmi";
import { createWalletClient, http, createPublicClient } from "viem";
import { goerli, baseGoerli, optimismGoerli, arbitrumGoerli } from "viem/chains";

const supportedChains: {
  [key: string]: any;
} = {
  ethereum: goerli,
  optimism: optimismGoerli,
  base: baseGoerli,
  arbitrum: arbitrumGoerli,
};
export const publicClient = (chain: string) =>
  createPublicClient({ chain: supportedChains[chain], transport: http() });
// export const { publicClient } = configureChains(supportedChains, [publicProvider()]);
export const walletClient = (chain: string) =>
  createWalletClient({ chain: supportedChains[chain], transport: http() });
