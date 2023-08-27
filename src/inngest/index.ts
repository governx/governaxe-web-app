import { Inngest } from "inngest";
// import { redisClient } from "@/connectors/redis";
// import * as joinQueueModel from "@/models/joinQueue";
// import * as ListMembersModel from "@/models/ListMembers";
// import { getTwitterClient } from "@/lib/client";
import { env } from "@/env.mjs";

export const inngest = new Inngest({ name: "Governaxe" });

//reset limit and dequeue every 15 minutesw
export const executeProposal = inngest.createFunction(
  { name: "execute proposal" },
  { event: "proposal/execute" },
  async ({ event, step }) => {
    await step.sleepUntil(event.data.run_at);

    await step.run("execute", async () => {
      console.log("Execute proposal");
    });
  }
);
