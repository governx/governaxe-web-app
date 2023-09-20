import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";
import { Icons } from "./icons";
import { StatusIcon } from "./status-icon";
import { env } from "@/env.mjs";

export function ProposalCard({ proposal, id }: { proposal: any; id: string }) {
  const url = env.NEXT_PUBLIC_SNAPSHOT_URL;
  return (
    <Card className="cursor-pointer col-span-12 md:col-span-6">
      <CardHeader>
        <CardTitle className="justify-between flex mb-4">
          <Badge className="mr-2" variant="outline">
            <StatusIcon status={proposal.state} />
            {proposal.state}
          </Badge>
          <Link href={`${url}/${id}/proposal/${proposal.id}`} target="_blank">
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
    </Card>
  );
}
