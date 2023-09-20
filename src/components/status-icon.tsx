import React from "react";
import { Icons } from "./icons";

export function StatusIcon({
  status,
}: {
  status: "active" | "pending" | "closed";
}) {
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
}
