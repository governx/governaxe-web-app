"use client";
import { Key, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
// import { getClient } from "@/lib/gqlClient";

import { useAccount } from "wagmi";

interface Spaces {}

export default function Home() {
  const { address, isConnected } = useAccount();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (isConnected) {
      // const datra
      const fetchData = async () => {
        const GET_FOLLOWS = `
          query getFollows($follower: String!) {
            follows(first: 10, where: { follower: $follower }) {
              follower
              space {
                id
                name
                avatar
                followersCount
              }
              created
            }
          }
        `;

        console.log(GET_FOLLOWS);
        // get the data from the api
        const url = "https://testnet.snapshot.org/graphql";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: GET_FOLLOWS,
            variables: {
              follower: address,
            },
          }),
        });

        // // convert the data to json
        const json = await response.json();

        console.log(json);

        // set state with the result
        setData(json.data);
      };

      // call the function
      fetchData()
        // make sure to catch any error
        .catch(console.error);
    }
  }, [isConnected]);

  return (
    <main
      className='flex flex-col items-center justify-between p-8'
      style={{
        minHeight: "calc(100vh - 5rem)",
      }}
    >
      <div className='w-full max-w-6xl gap-4'>
        <div className='flex gap-4'>
          <Input className='lg:w-1/3 md:w-2/3' type='search' placeholder='Search' />
        </div>
        <div className='gap-4 grid grid-cols-12 mt-4'>
          {isConnected &&
            data &&
            // @ts-ignore
            data?.follows.map(
              (
                dao: {
                  space: {
                    id: string;
                    avatar: string;
                    name: string;
                    followersCount: number;
                  };
                },
                index: Key | null | undefined
              ) => (
                <Link
                  href={`/${dao.space?.id}`}
                  key={index}
                  className='lg:col-span-3 md:col-span-4 col-span-12'
                >
                  <Card className='hover:border-zinc-50 cursor-pointer'>
                    <CardHeader>
                      <Avatar className='mb-2'>
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
                    <CardFooter>
                      {/* <Button className='w-full' variant='outline'>
                      Join
                    </Button> */}
                    </CardFooter>
                  </Card>
                </Link>
              )
            )}
        </div>
      </div>
    </main>
  );
}
