import { serve } from "inngest/next";
import { queueProposal, inngest } from "@/inngest";

export const { GET, POST, PUT } = serve(inngest, [queueProposal]);
