"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Icons } from "@/components/icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { InputForm } from "./components/form";

const daos = [
  {
    id: "arbitrum-dao",
    name: "Arbitrum DAO",
    members: 10,
    image: "https://cdn.stamp.fyi/space/arbitrumfoundation.eth",
  },
  {
    id: "aave",
    name: "Aave",
    members: 10,
    image: "https://cdn.stamp.fyi/space/aave.eth",
  },
  {
    id: "pancakeswap",
    name: "Pancakeswap",
    members: 10,
    image: "https://cdn.stamp.fyi/space/cakevote.eth",
  },
];

const proposals = [
  {
    id: "1",
    name: "Upgrade to v3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tristique augue sapien, at tempor nulla vehicula pharetra. Nullam at nisl ultrices, maximus leo vitae, tincidunt neque. Fusce cursus efficitur sagittis. Sed gravida risus in dapibus maximus. Vestibulum egestas est id arcu malesuada porttitor. Vestibulum feugiat nibh quis turpis scelerisque dapibus id ut felis. Suspendisse dapibus gravida est, sollicitudin porttitor ipsum cursus ac. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    progress: 40,
  },
  {
    id: "2",
    name: "Upgrade to v4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tristique augue sapien, at tempor nulla vehicula pharetra. Nullam at nisl ultrices, maximus leo vitae, tincidunt neque. Fusce cursus efficitur sagittis. Sed gravida risus in dapibus maximus. Vestibulum egestas est id arcu malesuada porttitor. Vestibulum feugiat nibh quis turpis scelerisque dapibus id ut felis. Suspendisse dapibus gravida est, sollicitudin porttitor ipsum cursus ac. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    progress: 90,
  },
  {
    id: "3",
    name: "Upgrade to v5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tristique augue sapien, at tempor nulla vehicula pharetra. Nullam at nisl ultrices, maximus leo vitae, tincidunt neque. Fusce cursus efficitur sagittis. Sed gravida risus in dapibus maximus. Vestibulum egestas est id arcu malesuada porttitor. Vestibulum feugiat nibh quis turpis scelerisque dapibus id ut felis. Suspendisse dapibus gravida est, sollicitudin porttitor ipsum cursus ac. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    progress: 60,
  },
];

const info = [
  {
    title: "Start Date",
    value: "Aug 10, 2023, 10:42 PM",
  },
  {
    title: "End Date",
    value: "Aug 13, 2023, 10:42 PM",
  },
  {
    title: "Execution Block",
    value: "17,885,442",
  },
];

export default function Home({
  params,
}: {
  params: { id: string; proposalid: string };
}) {
  const id = params.id;
  const proposalid = params.proposalid;
  const proposal = proposals.find((proposal) => proposal.id === proposalid);
  const dao = daos.find((dao) => dao.id === id);
  const router = useRouter();
  return (
    <main
      className="flex flex-col items-center justify-between p-8"
      style={{
        minHeight: "calc(100vh - 5rem)",
      }}
    >
      <div className="w-full max-w-6xl gap-4 grid grid-cols-12">
        <div className="col-span-12 md:col-spawn-8">
          <div className="flex items-center justify-between">
            <div className="gap-2">
              <Button
                variant="link"
                className="px-0"
                onClick={() => {
                  router.back();
                }}
              >
                <Icons.back className="w-4 mr-1" />
                Back
              </Button>
              <h1 className="text-2xl font-bold">{proposal?.name}</h1>
            </div>
          </div>
          <InputForm />
        </div>
        <div className="col-span-4 flex flex-col gap-4"></div>
      </div>
    </main>
  );
}
