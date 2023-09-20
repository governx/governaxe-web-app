"use client";

import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import SearchInput from "@/components/search-input";
import FollowList from "@/components/follow-list";

export default function Home() {
  const { address, isConnected } = useAccount();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (isConnected) {
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

        const json = await response.json();

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
      className="flex flex-col items-center justify-between p-8"
      style={{ minHeight: "calc(100vh - 5rem)" }}
    >
      <div className="w-full max-w-6xl gap-4">
        <SearchInput />
        <FollowList isConnected={isConnected} data={data} />
      </div>
    </main>
  );
}
