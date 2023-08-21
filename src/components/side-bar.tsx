import { Icons } from "./icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
// import { getClient } from "@/lib/gqlClient";
// import { gql } from "@apollo/client";

// const GET_FOLLOWS = gql`
//   query getFollows($follower: String!) {
//     follows(first: 10, where: { follower: $follower }) {
//       follower
//       space {
//         id
//         name
//         avatar
//         followersCount
//       }
//       created
//     }
//   }
// `;

const daos = [
  {
    name: "Arbitrum DAO",
    members: 10,
    image: "https://cdn.stamp.fyi/space/arbitrumfoundation.eth",
  },
  {
    name: "Aave",
    members: 10,
    image: "https://cdn.stamp.fyi/space/aave.eth",
  },
  {
    name: "Pancakeswap",
    members: 10,
    image: "https://cdn.stamp.fyi/space/cakevote.eth",
  },
];

export const SideBar = async ({ children }: { children: React.ReactNode }) => {
  // const { data } = await getClient().query({
  //   query: GET_FOLLOWS,
  //   variables: {
  //     follower: "0xD682D2D047AF807561CDe82EEc248Ddf6654c83b",
  //   },
  //   context: {
  //     fetchOptions: {
  //       next: { revalidate: 5 },
  //     },
  //   },
  // });
  //in demo enpoint avatar is not working
  return (
    <div className='flex'>
      <div className='border-r p-3 gap-8 flex flex-col items-center'>
        <Icons.logo className='w-8 h-8' />

        <div className='flex flex-col gap-2'>
          {daos.map((dao, index) => (
            <Avatar className='border' key={index}>
              <AvatarImage src={dao.image} alt={dao.name} />
              <AvatarFallback>{dao.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <Separator />
        <Button size='icon' variant='outline'>
          <Icons.join className='w-4 h-4' />
        </Button>
      </div>
      <div className='w-full'>{children}</div>
    </div>
  );
};
