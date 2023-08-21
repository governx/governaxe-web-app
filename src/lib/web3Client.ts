// "use client";
// import { getDefaultWallets } from "@rainbow-me/rainbowkit";
// import { configureChains, createConfig } from "wagmi";
// import { mainnet, goerli, baseGoerli, optimismGoerli } from "wagmi/chains";
// import { publicProvider } from "wagmi/providers/public";
// import { env } from "@/env.mjs";

// const supportedChains = [mainnet, goerli, baseGoerli, optimismGoerli];

// export const { chains, publicClient } = configureChains(supportedChains, [publicProvider()]);

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
