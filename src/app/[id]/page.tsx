import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ProposalCard } from "@/components/proposal-card";

import Link from "next/link";

import { getProposals } from "@/lib/snapshot";

export const revalidate = 20;

export default async function Home({ params }: { params: { id: string } }) {
  const id = params.id;
  const response = await getProposals(id);

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
              <AvatarFallback>{id?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold">{id}</h1>
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
            <Link href={`/${id}/create`} className="md:w-2/3 lg:w-1/3">
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
          {response.data.proposals?.map((proposal: any, index: string) => (
            <ProposalCard key={index} proposal={proposal} id={id} />
          ))}
        </div>
      </div>
    </main>
  );
}
