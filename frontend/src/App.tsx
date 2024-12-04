import React from "react";
import { Routes, Route } from "react-router-dom";
import AddSubscriptionPage from "./pages/AddSubscriptionPage";
import ExtendSubscriptionPage from "./pages/ExtendSubscriptionPage";
import EndSubscriptionPage from "./pages/EndSubscriptionPage";
import SubscriptionReportPage from "./pages/SubscriptionReportPage";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* You can add a navbar here */}
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Subscription Management System</h1>
      </header>

      {/* Main content area */}
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-subscription" element={<AddSubscriptionPage />} />
          <Route
            path="/extend-subscription"
            element={<ExtendSubscriptionPage />}
          />
          <Route path="/end-subscription" element={<EndSubscriptionPage />} />
          <Route
            path="/subscription-report"
            element={<SubscriptionReportPage />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
