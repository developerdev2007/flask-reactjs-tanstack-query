// src/pages/Customers.tsx
import React from "react";
import { useCustomers } from "../hooks/subscription";

const Customers: React.FC = () => {
  const { data, isLoading, error } = useCustomers();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="container mx-auto mt-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">Customers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((customer: any) => (
          <div key={customer.id} className="p-4 border shadow-md">
            <h3 className="text-xl">{customer.name}</h3>
            <p className="text-sm text-gray-600">PAN: {customer.pan}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
