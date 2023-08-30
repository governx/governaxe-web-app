import Link from "next/link";
import { Button } from "./ui/button";
// import { ConnectWalletBtn } from "./connect-btn";
import RainbowBtn from "./rainbow-btn";
import { Icons } from "./icons";

export const NavBar = () => {
  return (
    <div className="p-4 justify-center flex border-b">
      <div className="max-w-6xl w-full text-lg font-bold justify-between flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="w-6 h-6" />
          <h1>Governaxe</h1>
        </Link>
        <RainbowBtn />
      </div>
    </div>
  );
};
