import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import { getRevenueReport } from "../services/subscriptionsAPI";

const SubscriptionReportPage = () => {
  const [alert, setAlert] = useState<string>("");

  // Fetch revenue data from the backend
  const {
    data: revenueData,
    isLoading,
    error,
  } = useQuery(["revenueReport"], getRevenueReport);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div className="alert alert-danger">{error.message}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Subscription Revenue Report
      </h2>

      {alert && <div className="alert alert-info mb-4">{alert}</div>}

      <div className="mb-4">
        <h3 className="text-lg font-medium">
          Total Revenue: ${revenueData?.totalRevenue}
        </h3>
      </div>

      <div className="mb-4">
        <h4 className="font-medium">Revenue Breakdown by Product</h4>
        <table className="table-auto w-full mt-2 border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="p-2 border border-gray-300">Product Name</th>
              <th className="p-2 border border-gray-300">Total Revenue</th>
            </tr>
          </thead>
          <tbody>
            {revenueData?.productRevenue.map((item) => (
              <tr key={item.productName}>
                <td className="p-2 border border-gray-300">
                  {item.productName}
                </td>
                <td className="p-2 border border-gray-300">
                  ${item.totalRevenue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionReportPage;
