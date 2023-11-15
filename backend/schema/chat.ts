import { string, z } from "zod";
import { isValidHostname } from "../utils/helpers";
import { DOMAIN_CHECKER_SUFFIX } from "../utils/constants";
// import { Proof } from "../utils/types";
export const createConversationInput = z.object({
  senderId: z.string(),
  recipientId: z.string(),
  friendlyName: z.string(),
  uniqueName: z.string(),
  id: z.string(),
});

// export type Proof = {
//   chainId: number;
//   context: string;
//   epoch: number;
//   extractedParameterValues: Record<string, string>;
//   identifier: string;
//   onChainClaimId: string;
//   ownerPublicKey: string;
//   parameters: string;
//   provider: string;
//   redactedParameters: string;
//   sessionId?: string;
//   signatures: string[];
//   templateClaimId: string;
//   timestampS: string;
//   witnessAddresses?: string[];
// };

export const proofInput = z.object({
  chainId: z.number(),
  context: z.string(),
  epoch: z.number(),
  extractedParameterValues: z.string(),
  identifier: z.string(),
  onChainClaimId: z.string(),
  ownerPublicKey: z.string(),
  parameters: z.string(),
  provider: z.string(),
  redactedParameters: z.string(),
  sessionId: z.string().optional(),
  signatures: z.array(z.string()),
  templateClaimId: z.string(),
  timestampS: z.string(),
  witnessAddresses: z.array(z.string()).optional(),
});

export const proofSchemaInput = z.object({
  ...proofInput.shape,
  conversationId: z.string(),
  userId: z.string(),
});
