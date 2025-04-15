import React from "react";

import ProposalComponent from "../components/ProposalComponent";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Header />

      <ProposalComponent />

      <Footer />
    </div>
  );
};

export default Dashboard;
