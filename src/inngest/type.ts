import { EventSchemas, Inngest } from "inngest";
import { type } from "os";
// {
//     "name": "proposal/execute",
//     "data": {
//       "proposals": [
//         {
//           "calls": [
//             {
//               "args": [
//                 "Hello World"
//               ],
//               "func_selector": "function setState(string)",
//               "target": "0x6Bcd366aFAB28C91357ae69CacB6CbBbCA46dF76",
//               "value": 0
//             }
//           ],
//           "dst_chain": "optimism",
//           "dst_contract": "0xf9e2F5833F063b622e61ff3eb52b5E1D5ACdB432"
//         }
//       ],
//       "src_chain": "ethereum"
//     }
//   }

type Call = {
  args: string[];
  func_selector: string;
  target: string;
  value: number;
};

type Proposal = {
  calls: Call[];
  dst_chain: string;
  dst_contract: string;
};

export type Events = {
  "proposal/execute": {
    data: {
      proposals: Proposal[];
      src_chain: string;
      run_at: string;
    };
  };
};
