export type Role = "admin" | "user";

export interface User {
  id: number;
  username: string;
  password: string;
  role: Role;
}

export interface Product {
  id: number;
  name: string;
}

export type ProposalStatus =
  | "ODBIJENO"
  | "NA RAZMATRANJU"
  | "NA ČEKANJU"
  | "PRIHVAĆENO";

export interface Proposal {
  id: number;
  user: number;
  productId: number;
  text: string;
  status: ProposalStatus;
  date: string;
}
