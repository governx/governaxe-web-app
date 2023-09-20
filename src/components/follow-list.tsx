import React from "react";
import FollowCard from "@/components/follow-card";

function FollowList({
  isConnected,
  data,
}: {
  isConnected: boolean;
  data: any;
}) {
  if (!isConnected || !data) {
    return null;
  }

  return (
    <div className="gap-4 grid grid-cols-12 mt-4">
      {data.follows.map((dao: any, index: number) => (
        <FollowCard key={index} dao={dao} />
      ))}
    </div>
  );
}

export default FollowList;
