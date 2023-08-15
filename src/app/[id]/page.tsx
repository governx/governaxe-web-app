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
        <div className="flex items-center justify-between">
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
        <div className="flex gap-4 justify-between mt-4">
          <div className="flex gap-4 w-1/2">
            <Input type="search" placeholder="Search proposal" />
            <Link href={`/${dao?.id}/create`} className="w-1/3">
              <Button>New Proposal</Button>
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
            <Link
              href={`/${dao?.id}/proposal/${proposal.id}`}
              key={index}
              className="col-span-6"
            >
              <Card className="hover:border-zinc-50 cursor-pointer">
                <CardHeader>
                  <CardTitle>
                    <Badge className="mr-2">
                      <Icons.voting className="w-3 h-3 mr-1" />
                      Voting Period
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    #{proposal.id} {proposal.name}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Progress className="mb-2" value={proposal.progress} />
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
