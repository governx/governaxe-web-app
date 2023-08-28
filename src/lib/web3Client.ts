import { configureChains } from "wagmi";
import { createWalletClient, http, createPublicClient } from "viem";
// import { mainnet, goerli, baseGoerli, optimismGoerli } from "wagmi/chains";
import { goerli } from "viem/chains";
// import { publicProvider } from "wagmi/providers/public";

// const supportedChains = [mainnet, goerli, baseGoerli, optimismGoerli];
export const publicClient = createPublicClient({
  chain: goerli,
  transport: http(),
});

// export const { publicClient } = configureChains(supportedChains, [publicProvider()]);
export const walletClient = createWalletClient({
  chain: goerli,
  transport: http(),
});

// const { connectors } = getDefaultWallets({
//   appName: "Governaxe",
//   projectId: env.WALLET_CONNECT_ID,
//   chains,
// });

// export const config = createConfig({
//   autoConnect: true,
//   connectors,
//   publicClient,
// });
