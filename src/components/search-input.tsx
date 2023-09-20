import React from "react";
import { Input } from "@/components/ui/input";

function SearchInput() {
  return (
    <div className="flex gap-4">
      <Input className="lg:w-1/3 md:w-2/3" type="search" placeholder="Search" />
    </div>
  );
}

export default SearchInput;
