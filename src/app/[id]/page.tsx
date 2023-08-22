import { Input } from "@/components/ui/input";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Icons } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

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
    id: 1,
    name: "Upgrade to v3",
    progress: 40,
  },
  {
    id: 2,
    name: "Upgrade to v4",
    progress: 90,
  },
  {
    id: 3,
    name: "Upgrade to v5",
    progress: 60,
  },
];
export default function Home({ params }: { params: { id: string } }) {
  const id = params.id;
  const dao = daos.find((dao) => dao.id === id);
  return (
    <main
      className="flex flex-col items-center justify-between p-8"
      style={{
        minHeight: "calc(100vh - 5rem)",
      }}
    >
      <div className="w-full max-w-6xl gap-4">
        <div className="flex items-center justify-between flex-col md:flex-row">
          <div className="flex items-center gap-2">
            <Avatar className="mb-2">
              <AvatarImage src={dao?.image} alt={dao?.name} />
              <AvatarFallback>{dao?.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold">{dao?.name}</h1>
          </div>
          <div className="flex gap-2">
            <Button className="ml-auto" variant="outline" size="icon">
              𝕏
            </Button>
            <Button className="ml-auto" variant="outline" size="icon">
              <Icons.globe className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-between mt-4">
          <div className="flex gap-4 md:w-1/2 flex-col md:flex-row">
            <Input type="search" placeholder="Search proposal" />
            <Link href={`/${dao?.id}/create`} className="md:w-2/3 lg:w-1/3">
              <Button className="w-full">New Proposal</Button>
            </Link>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center">
                All Period
                <Icons.chevronDown className="w-4 h-4 ml-2" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Voting period</DropdownMenuItem>
              <DropdownMenuItem>Passed</DropdownMenuItem>
              <DropdownMenuItem>Rejected</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="gap-4 grid grid-cols-12 mt-4">
          {proposals.map((proposal, index) => (
            <Card
              className="cursor-pointer col-span-12 md:col-span-6"
              key={index}
            >
              <CardHeader>
                <CardTitle className="justify-between flex">
                  <Badge className="mr-2" variant="outline">
                    <Icons.voting className="w-3 h-3 mr-1" />
                    Voting Period
                  </Badge>
                  <Button
                    size="sm"
                    className="rounded-full gap-1 items-center"
                    variant="secondary"
                  >
                    <Icons.snapshot className="w-4 h-4 text-yellow-500" />
                    Snapshot
                    <Icons.external className="w-3 h-3" />
                  </Button>
                </CardTitle>
                <CardDescription>
                  #{proposal.id} {proposal.name}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-col gap-1">
                <Progress className="mb-2" value={proposal.progress} />
                <Button className="w-full">Execute</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
