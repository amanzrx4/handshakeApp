import {
  proofAge,
  proofEmployment,
  proofIncome,
  proofName,
} from '@app/assets/svg';

/** type of handshake the application supports */
export enum HandshakeType {
  Dating = 'dating',
  General = 'general',
  // Rental = 'rental',
  // Hiring = 'hiring',
}

export const proofLabel = [
  {label: 'Name', icon: proofName},
  {label: 'Age', icon: proofAge},
  {label: 'Employment', icon: proofEmployment},
  {label: 'Income', icon: proofIncome},
] as const;

export const providers = ['aadhar', 'google', 'apple'] as const;

export type ProofType = Record<
  (typeof proofLabel)[number]['label'],
  [(typeof providers)[number], ...(typeof providers)[number][]]
>;

export const proofsMap: ProofType = {
  Age: ['aadhar', 'apple'],
  Name: ['aadhar', 'apple'],
  Employment: ['aadhar', 'apple'],
  Income: ['aadhar', 'apple'],
};

export type Proof = {
  chainId: number;
  context: string;
  epoch: number;
  extractedParameterValues: string;
  identifier: string;
  onChainClaimId: string;
  ownerPublicKey: string;
  parameters: string;
  provider: string;
  redactedParameters: string;
  sessionId?: string;
  signatures: string[];
  templateClaimId: string;
  timestampS: string;
  witnessAddresses?: string[];
};
