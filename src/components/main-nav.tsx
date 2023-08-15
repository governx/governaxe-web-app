import Link from "next/link";
import { Button } from "./ui/button";

export const NavBar = () => {
  return (
    <div className="p-4 justify-center flex border-b">
      <div className="max-w-6xl w-full text-lg font-bold justify-between flex items-center">
        <Link href="/">
          <h1>Governaxe</h1>
        </Link>
        <Button>Connect Wallet</Button>
      </div>
    </div>
  );
};
