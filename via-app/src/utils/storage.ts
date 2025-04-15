import { Proposal } from "../types";

export const getProposals = (): Proposal[] => {
  return JSON.parse(localStorage.getItem("proposals") || "[]");
};

export const saveProposals = (proposals: Proposal[]): void => {
  localStorage.setItem("proposals", JSON.stringify(proposals));
};
