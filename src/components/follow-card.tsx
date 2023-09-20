import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function FollowCard({ dao }: { dao: any }) {
  return (
    <Link
      href={`/${dao.space?.id}`}
      className="lg:col-span-3 md:col-span-4 col-span-12"
    >
      <Card className="hover:border-zinc-50 cursor-pointer">
        <CardHeader>
          <Avatar className="mb-2">
            <AvatarImage
              src={`https://cloudflare-ipfs.com/ipfs/${
                dao.space.avatar.split("://")[1]
              }`}
              alt={dao.space?.name}
            />
            <AvatarFallback>{dao.space?.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <CardTitle>{dao.space?.name}</CardTitle>
          <CardDescription>{dao.space?.followersCount} Members</CardDescription>
        </CardHeader>
        <CardFooter></CardFooter>
      </Card>
    </Link>
  );
}

export default FollowCard;
