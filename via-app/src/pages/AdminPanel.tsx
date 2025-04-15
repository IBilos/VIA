import React, { useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ProposalComponent from "../components/ProposalComponent";
import AdminComponent from "../components/AdminComponent";

const AdminPanel: React.FC = () => {
  // State for active tab (either "adminComponent" or "dashboard")
  const [activeTab, setActiveTab] = useState<string>("adminComponent");

  return (
    <div className="flex flex-col h-screen w-screen">
      <Header />
      {/* Tab buttons */}
      <div className="flex p-4 bg-gray-100">
        <button
          onClick={() => setActiveTab("adminComponent")}
          className={`py-2 px-4 font-semibold text-lg ${
            activeTab === "adminComponent"
              ? "bg-blue-500 text-white"
              : "text-blue-500"
          } hover:bg-blue-200 rounded-md transition-all duration-300 cursor-pointer`}
        >
          Admin Panel
        </button>
        <button
          onClick={() => setActiveTab("proposalComponent")}
          className={`py-2 px-4 font-semibold text-lg ${
            activeTab === "proposalComponent"
              ? "bg-blue-500 text-white"
              : "text-blue-500"
          } hover:bg-blue-200 rounded-md transition-all duration-300 cursor-pointer`}
        >
          Novi prijedlozi
        </button>
      </div>
      {/* Content based on active tab */}
      {activeTab === "adminComponent" && <AdminComponent />}
      {activeTab === "proposalComponent" && <ProposalComponent />}
      <Footer />
    </div>
  );
};

export default AdminPanel;
