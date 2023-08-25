"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { FC, PropsWithChildren } from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit";
// import { ConnectKitProvider, getDefaultConfig } from "connectkit";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, goerli, baseGoerli, optimismGoerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { env } from "@/env.mjs";

const supportedChains = [mainnet, goerli, baseGoerli, optimismGoerli];

const { chains, publicClient } = configureChains(supportedChains, [
  publicProvider(),
]);

const { connectors } = getDefaultWallets({
  appName: "Governaxe",
  projectId: env.NEXT_PUBLIC_WALLET_CONNECT_ID,
  chains,
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

// import { SessionProvider } from "next-auth/react";
// // import { APP_NAME } from "@/lib/consts";
// import { env } from "@/env.mjs";

// const config = createConfig(
//   getDefaultConfig({
//     appName: APP_NAME,
//     // infuraId: env.NEXT_PUBLIC_INFURA_ID,
//     // alchemyId: env.NEXT_PUBLIC_ALCHEMY_ID,
//     walletConnectProjectId: env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
//   })
// );

const Web3Provider: FC<PropsWithChildren<{}>> = ({ children }) => (
  //   <SessionProvider>
  <WagmiConfig config={config}>
    <RainbowKitProvider
      theme={darkTheme({
        accentColor: "#fff",
        accentColorForeground: "black",
        borderRadius: "large",
        fontStack: "system",
        overlayBlur: "small",
      })}
      chains={chains}
    >
      {/* <ConnectKitProvider theme='midnight'> */}
      {children}
      {/* </ConnectKitProvider> */}
    </RainbowKitProvider>
  </WagmiConfig>
  //   </SessionProvider>
);

export default Web3Provider;
