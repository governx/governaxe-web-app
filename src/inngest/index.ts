import { Inngest, EventSchemas } from "inngest";
import { Events } from "./type";
import { parseAbiItem, encodeFunctionData, formatEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { publicClient, walletClient } from "@/lib/web3Client";
import * as InterchainProposalSender from "./abis/InterchainProposalSender.json";
import { CHAINS, Environment, AxelarQueryAPI } from "@axelar-network/axelarjs-sdk";
import { chains as testnetChains } from "./config/testnet.json";

import { env } from "@/env.mjs";

export const inngest = new Inngest({
  name: "Governaxe",
  events: new EventSchemas().fromRecord<Events>(),
});

//reset limit and dequeue every 15 minutesw
export const executeProposal = inngest.createFunction(
  { name: "execute proposal" },
  { event: "proposal/execute" },
  async ({ event, step }) => {
    await step.sleepUntil(event.data.run_at);
    // await step.run("execute", async () => {
    //   console.log(event.data);
    //   console.log("Execute proposal");
    // });

    await step.run("execute", async () => {
      const executorAccount = privateKeyToAccount(`0x${env.EXECUTOR_PK}`);
      const abi = InterchainProposalSender.abi;
      const queryApi = new AxelarQueryAPI({ environment: Environment.TESTNET });
      //@ts-ignore
      const srcChain = testnetChains[event.data.src_chain];
      let totalGasFee = BigInt(0);
      const proposals = event.data.proposals;
      const fmtProposals = [];

      for (const proposal of proposals) {
        const callsData = [];
        //@ts-ignore
        const destChain = testnetChains[proposal.dst_chain];
        let proposalFee = BigInt(0);
        const gasFee = await queryApi.estimateGasFee(
          srcChain.id,
          destChain.id,
          srcChain.tokenSymbol
        );

        proposalFee += BigInt(gasFee.toString());

        for (const call of proposal.calls) {
          const funcSelctor = parseAbiItem(call.func_selector);
          const callData = encodeFunctionData({
            abi: [funcSelctor],
            args: call.args,
          });
          // console.log("funcSelctor", funcSelctor.name);
          // 0x68794b870000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000b48656c6c6f20576f726c64000000000000000000000000000000000000000000
          // 0x68794b870000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000548656c6c6f000000000000000000000000000000000000000000000000000000
          // 0x68794b870000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000b48656c6c6f20576f726c64000000000000000000000000000000000000000000

          //@ts-ignore
          const callDataGasEstimate = await publicClient.estimateContractGas({
            address: `0x${call.target.slice(2)}`,
            abi: [funcSelctor],
            //@ts-ignore
            functionName: funcSelctor.name,
            args: call.args,
            account: executorAccount,
          });

          const callDataGasFee = await queryApi.estimateGasFee(
            srcChain.id,
            destChain.id,
            srcChain.tokenSymbol,
            parseInt(callDataGasEstimate.toString()),
            1.5
          );

          console.log("calladata est", formatEther(BigInt(callDataGasFee.toString())));
          console.log("gasFee", formatEther(BigInt(gasFee.toString())));

          proposalFee += BigInt(callDataGasFee.toString());

          callsData.push([call.target, call.value, callData]);
        }

        fmtProposals.push({
          destinationChain: proposal.dst_chain,
          destinationContract: proposal.dst_contract,
          gas: proposalFee.toString(),
          calls: callsData,
        });

        totalGasFee += proposalFee;
      }

      // console.log(fmtProposals);
      console.log("total ether gas fee", formatEther(totalGasFee));
      console.log("fmtProposals", fmtProposals[0].calls);

      const { request } = await publicClient.simulateContract({
        address: "0x6bd85C53D9AA00193e178589C0B10C9B8F0b1467",
        abi: abi,
        functionName: "sendProposals",
        account: executorAccount,
        value: totalGasFee,
        args: [fmtProposals],
      });

      // console.log("request", request.args);

      await walletClient.writeContract(request);
      console.log("Execute proposal");
    });
  }
);
