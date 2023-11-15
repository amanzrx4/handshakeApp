import { z } from "zod";
import { proofInput } from "../../schema/chat";

export type Proof = z.infer<typeof proofInput>;
