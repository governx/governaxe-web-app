"use client";

import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import SearchInput from "@/components/search-input";
import FollowList from "@/components/follow-list";
import { getFollows } from "@/lib/snapshot";

export default function Home() {
  const { address, isConnected } = useAccount();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (isConnected && address) {
      const fetchData = async () => {
        try {
          const response = await getFollows(address);
          setData(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [isConnected, address]);

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
