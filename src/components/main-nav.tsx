import Link from "next/link";
import { Button } from "./ui/button";
// import { ConnectWalletBtn } from "./connect-btn";
import RainbowBtn from "./rainbow-btn";

export const NavBar = () => {
  return (
    <div className='p-4 justify-center flex border-b'>
      <div className='max-w-6xl w-full text-lg font-bold justify-between flex items-center'>
        <Link href='/'>
          <h1>Governaxe</h1>
        </Link>
        {/* <ConnectWalletBtn /> */}
        {/* <ConnectButton /> */}
        <RainbowBtn />
      </div>
    </div>
  );
};
