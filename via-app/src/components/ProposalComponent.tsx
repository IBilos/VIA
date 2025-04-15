import React, { useEffect, useState } from "react";
import { Proposal, Product } from "../types";
import { getCurrentUser } from "../utils/auth";
import { User } from "../types";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProposalComponent: React.FC = () => {
  const [proposalText, setProposalText] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    } else {
      alert("Greska kod logina");
      navigate("/login");
    }
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

  const handleSubmitProposal = () => {
    if (!proposalText || selectedProduct === null) {
      alert("Molimo popunite sva polja.");
      return;
    }

    if (!user?.id) {
      alert("Greska kod spremanja. Korisnik nema id.");
      return;
    }

    const newProposal: Omit<Proposal, "id"> = {
      user: user.id,
      productId: selectedProduct,
      text: proposalText,
      status: "NA RAZMATRANJU",
      date: new Date().toISOString(),
    };

    // Submit the proposal to the backend

    axios
      .post("http://localhost:5176/api/proposals", newProposal, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setProposals([...proposals, response.data]);
        setProposalText("");
        setSelectedProduct(null);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error submitting proposal:", error);
      });
  };

  // Filtriraj prijedloge s obzirom na trenutni korisnicki id
  const filteredProposals = proposals.filter(
    (proposal) => proposal.user === user?.id
  );

  return (
    <div className="flex flex-col w-full flex-grow p-6 bg-gray-50 overflow-auto">
      <div className="bg-white rounded-xl shadow-md p-6">
        {/* Proposals Table */}
        <div className="flex flex-row justify-between">
          <h3 className="text-2xl font-semibold mb-4">
            Vaši prethodni prijedlozi
          </h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-4 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Novi prijedlog
          </button>
        </div>

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
                  Datum i vrijeme
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProposals.map((proposal) => (
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
                    {new Date(proposal.date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for New Proposal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl font-semibold mb-4">Novi prijedlog</h3>
            <div className="mb-4">
              <label>Proizvod:</label>
              <select
                value={selectedProduct || ""}
                onChange={(e) => setSelectedProduct(Number(e.target.value))}
                className="p-2 border rounded w-full"
              >
                <option value="">Odaberite proizvod</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label>Prijedlog:</label>
              <textarea
                value={proposalText}
                onChange={(e) => setProposalText(e.target.value)}
                rows={5}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)} // Close the modal without saving
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
              >
                Odustani
              </button>
              <button
                onClick={handleSubmitProposal} // Submit the new proposal
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Potvrdi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposalComponent;
