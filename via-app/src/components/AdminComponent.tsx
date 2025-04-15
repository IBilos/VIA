import React, { useEffect, useState } from "react";
import { Proposal, ProposalStatus, Product } from "../types";
import axios from "axios";

const AdminComponent: React.FC = () => {
  //Get all propousals for admin
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProductsAndProposalsFromBackend();
  }, []);

  const getProductsAndProposalsFromBackend = () => {
    // Fetch products from backend
    axios
      .get("http://localhost:5176/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching products:", error);
      });

    // Fetch proposals from backend
    axios
      .get("http://localhost:5176/api/proposals")
      .then((response) => {
        setProposals(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching proposals:", error);
      });
  };

  const handleStatusChange = (proposalId: number, newStatus: string) => {
    // Log the data being sent to ensure it's correct
    console.log("Sending status:", newStatus);

    // Update status in backend using PATCH request
    axios
      .patch(`http://localhost:5176/api/proposals/${proposalId}`, newStatus, {
        headers: {
          "Content-Type": "application/json", // Ensure proper content-type
        },
      })
      .then(() => {
        // Update the status locally to reflect the change in UI
        const updatedProposals = proposals.map((proposal) =>
          proposal.id === proposalId
            ? { ...proposal, status: newStatus as ProposalStatus }
            : proposal
        );
        setProposals(updatedProposals); // Update the proposals state
      })
      .catch((error) => {
        console.error("Error updating proposal status:", error);
      });
  };

  return (
    <div className="flex flex-col w-full flex-grow p-6 bg-gray-50 overflow-auto">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-2xl font-semibold mb-4">Svi prijedlozi</h3>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-100 text-gray-700">
                <th className="px-6 py-3 text-left border border-gray-300">
                  Proizvod
                </th>
                <th className="px-6 py-3 text-left border border-gray-300">
                  Status
                </th>
                <th className="px-6 py-3 text-left border border-gray-300">
                  Prijedlog
                </th>
                <th className="px-6 py-3 text-left border border-gray-300">
                  Promjena statusa
                </th>
              </tr>
            </thead>
            <tbody>
              {proposals.map((proposal) => (
                <tr
                  key={proposal.id}
                  className="even:bg-gray-50 odd:bg-white border border-gray-200"
                >
                  <td className="px-6 py-4 border border-gray-300">
                    {products.find((p) => p.id === proposal.productId)?.name}
                  </td>
                  <td className="px-6 py-4 border border-gray-300">
                    {proposal.status}
                  </td>
                  <td className="px-6 py-4 border border-gray-300">
                    {proposal.text}
                  </td>
                  <td className="px-6 py-4 border border-gray-300">
                    <select
                      value={proposal.status}
                      onChange={(e) =>
                        handleStatusChange(proposal.id, e.target.value)
                      }
                      className="border border-gray-300 rounded px-3 py-1 w-full"
                    >
                      <option value="ODBIJENO">ODBIJENO</option>
                      <option value="NA RAZMATRANJU">NA RAZMATRANJU</option>
                      <option value="NA ČEKANJU">NA ČEKANJU</option>
                      <option value="PRIHVAĆENO">PRIHVAĆENO</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminComponent;
