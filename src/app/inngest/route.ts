import { serve } from "inngest/next";
import { executeProposal, inngest } from "@/inngest";

export const { GET, POST, PUT } = serve(inngest, [executeProposal]);
