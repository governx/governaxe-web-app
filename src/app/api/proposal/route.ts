import { NextResponse, NextRequest } from "next/server";
import { inngest } from "@/inngest"; // Import our client
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
      dst_contract: z.string(),
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
              target: proposal.dst_contract,
              value: proposal.calls.value,
            },
          ],
          dst_chain: proposal.dst_chain,
          dst_contract: proposal.dst_contract,
        };
      }),
      src_chain: src_chain,
      run_at,
    },
  });

  return NextResponse.json({ name: "Hello Inngest from Next!" });
}
