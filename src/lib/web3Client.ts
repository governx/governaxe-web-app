import { configureChains } from "wagmi";
import { createWalletClient, http, createPublicClient } from "viem";
import { baseGoerli } from "viem/chains";

// const supportedChains = [mainnet, goerli, baseGoerli, optimismGoerli];
export const publicClient = createPublicClient({
  chain: baseGoerli,
  transport: http(),
});

// export const { publicClient } = configureChains(supportedChains, [publicProvider()]);
export const walletClient = createWalletClient({
  chain: baseGoerli,
  transport: http(),
});

