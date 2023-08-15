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
import { VoteForm } from "./components/form";

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
    title: "Chains",
    value: "ETH, ARB, OP",
  },
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
        <div className="col-span-12 md:col-span-8">
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
          <div className="flex gap-4 justify-between mt-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div>
                <Badge className="mr-2">
                  <Icons.voting className="w-3 h-3 mr-1" />
                  Voting Period
                </Badge>
              </div>
              <div className="flex items-center">
                <Avatar className="mr-2 w-6 h-6">
                  <AvatarImage src={dao?.image} />
                  <AvatarFallback>{dao?.name}</AvatarFallback>
                </Avatar>
                <h1 className="text-muted-foreground">
                  {dao?.name} by{" "}
                  <span className="text-secondary-foreground">
                    0x2342...1203
                  </span>
                </h1>
              </div>
            </div>
          </div>
          <p className="hidden md:block md:w-3/4 mt-4 text-muted-foreground">
            {proposal?.description}
          </p>
          <div className="mt-4">
            <h1 className="text-2xl font-bold">Discussion</h1>
            <Card className="mt-2 hover:border-zinc-50 cursor-pointer">
              <CardHeader>
                <CardTitle>Upgrade to v3 Voting Period</CardTitle>
                <CardDescription>Upgrade to v3 Voting Period</CardDescription>
              </CardHeader>
            </Card>
          </div>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Cast your vote</CardTitle>
            </CardHeader>
            <CardContent>
              <VoteForm />
            </CardContent>
          </Card>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Votes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        0xCff5...8D6e
                      </TableCell>
                      <TableCell>Yes</TableCell>
                      <TableCell className="text-right">608K veSTG</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Information</CardTitle>
              <CardDescription>Vote on this proposal</CardDescription>
            </CardHeader>
            <CardContent>
              {info.map((item) => (
                <div key={item.title} className="flex justify-between">
                  <div className="text-muted-foreground">{item.title}</div>
                  <div className="text-secondary-foreground">{item.value}</div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription>Vote on this proposal</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <div>Yes</div>
                  <div>7.6M veSTG 93.83%</div>
                </div>
                <Progress value={93.83} />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <div>No</div>
                  <div>297K veSTG 3.65%</div>
                </div>
                <Progress value={3.65} />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <div>Abstain</div>
                  <div>205K veSTG 2.52%</div>
                </div>
                <Progress value={2.52} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
