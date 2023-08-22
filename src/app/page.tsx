import { Input } from "@/components/ui/input";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

export default function Home() {
  return (
    <main
      className="flex flex-col items-center justify-between p-8"
      style={{
        minHeight: "calc(100vh - 5rem)",
      }}
    >
      <div className="w-full max-w-6xl gap-4">
        <div className="flex gap-4">
          <Input
            className="lg:w-1/3 md:w-2/3"
            type="search"
            placeholder="Search"
          />
        </div>
        <div className="gap-4 grid grid-cols-12 mt-4">
          {daos.map((dao, index) => (
            <Link
              href={`/${dao.id}`}
              key={index}
              className="lg:col-span-3 md:col-span-4 col-span-12"
            >
              <Card className="hover:border-zinc-50 cursor-pointer">
                <CardHeader>
                  <Avatar className="mb-2">
                    <AvatarImage src={dao.image} alt={dao.name} />
                    <AvatarFallback>{dao.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <CardTitle>{dao.name}</CardTitle>
                  <CardDescription>{dao.members} Members</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
