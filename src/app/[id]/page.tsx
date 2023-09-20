import { Input } from "@/components/ui/input";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Icons } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getClient } from "@/lib/gqlClient";
import { gql } from "@apollo/client";

//testnet snapshot
const url = "https://demo.snapshot.org/#";

const GET_PROPOSALS = gql`
  query getProposals($space: String!) {
    proposals(
      first: 10
      where: { space: $space }
      orderBy: "created"
      orderDirection: desc
    ) {
      id
      title
      state
      start
      end
      snapshot
      author
    }
  }
`;

export default async function Home({ params }: { params: { id: string } }) {
  const id = params.id;
  const { data } = await getClient().query({
    query: GET_PROPOSALS,
    variables: {
      space: id,
    },
    context: {
      fetchOptions: {
        next: { revalidate: 20 },
      },
    },
  });

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
          {data.proposals?.map(
            (
              proposal: {
                id: string;
                title: string;
                state: string;
                start: number;
                end: number;
                snapshot: string;
                author: string;
              },
              index: number,
            ) => (
              <Card
                className="cursor-pointer col-span-12 md:col-span-6"
                key={index}
              >
                <CardHeader>
                  <CardTitle className="justify-between flex mb-4">
                    <Badge className="mr-2" variant="outline">
                      <StatusIcon status={proposal.state} />
                      {proposal.state}
                    </Badge>
                    <Link
                      href={`${url}/${id}/proposal/${proposal.id}`}
                      target="_blank"
                    >
                      <Button
                        size="sm"
                        className="rounded-full gap-1 items-center"
                        variant="secondary"
                      >
                        <Icons.snapshot className="w-4 h-4 text-yellow-500" />
                        Snapshot
                        <Icons.external className="w-3 h-3" />
                      </Button>
                    </Link>
                  </CardTitle>
                  <CardDescription>{proposal.title}</CardDescription>
                </CardHeader>
                <CardFooter className="flex flex-col gap-1">
                  {/* <Progress className='mb-2' value={proposal.state} /> */}
                  {/* <div className="flex gap-2 w-full">
                    <Button variant="ghost" className="text-destructive">
                      Cancel
                    </Button>
                    <Button className="w-full">Execute</Button>
                  </div> */}
                  {/* <Button variant="destructive" className="w-full">
                    Cancel
                  </Button> */}
                </CardFooter>
              </Card>
            ),
          )}
        </div>
      </div>
    </main>
  );
}

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "active":
      return <Icons.active className="w-4 h-4 mr-1 text-green-400" />;
    case "pending":
      return <Icons.pending className="w-4 h-4 mr-1 text-blue-400" />;
    case "closed":
      return <Icons.closed className="w-4 h-4 mr-1 text-pink-400" />;
    default:
      return <Icons.votingError className="w-4 h-4 mr-1 text-red-400" />;
  }
};
