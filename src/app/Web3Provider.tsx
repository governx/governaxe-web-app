"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { FC, PropsWithChildren } from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit";

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

const Web3Provider: FC<PropsWithChildren<{}>> = ({ children }) => (
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
      {children}
    </RainbowKitProvider>
  </WagmiConfig>
);

export default Web3Provider;
