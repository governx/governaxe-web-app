import { NextResponse, NextRequest } from "next/server";
import { inngest } from "@/inngest"; // Import our client
// import moment from "moment";
import * as z from "zod";

const bodySchema = z.object({
  src_chain: z.string(),
  proposals: z.array(
    z.object({
      calls: z.object({
        args: z.string(),
        func_selector: z.string(),
        target: z.string(),
        value: z.coerce.number(),
      }),
      dst_chain: z.string(),
    })
  ),
  run_at: z.string(),
});

// Create a simple async Next.js API route handler
export async function POST(req: NextRequest) {
  console.log("POST /api/proposal");
  // Send your event payload to Inngest
  const body = await req.json();
  const { src_chain, proposals, run_at } = bodySchema.parse(body);
  await inngest.send({
    name: "proposal/execute",
    data: {
      proposals: proposals.map((proposal) => {
        return {
          calls: [
            {
              args: [proposal.calls.args],
              func_selector: proposal.calls.func_selector,
              target: proposal.calls.target,
              value: proposal.calls.value,
            },
          ],
          dst_chain: proposal.dst_chain,
          dst_contract: "0xf9e2F5833F063b622e61ff3eb52b5E1D5ACdB432",
        };
      }),
      src_chain: src_chain,
      // add 5 minutes to the run_at time
      // run_at: moment(run_at).add(5, "minutes").format("YYYY-MM-DDTHH:mm:ss.sssZ"),
      run_at,
    },
  });

  return NextResponse.json({ name: "Hello Inngest from Next!" });
}
