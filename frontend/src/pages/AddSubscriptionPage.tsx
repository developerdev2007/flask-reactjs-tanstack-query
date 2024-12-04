import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  // getCustomers,
  // getProducts,
  addSubscription,
} from "../services/subscriptionService";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddSubscriptionPage = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [numOfUsers, setNumOfUsers] = useState<number>(1);
  const [alert, setAlert] = useState<string>("");

  const { data: customers, isLoading: isCustomersLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_KEY}/customers`
      );
      return response.data;
    },
  });
  const { data: products, isLoading: isProductsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_KEY}/products`
      );
      return response.data;
    },
  });

  const navigate = useNavigate();

  const handleAddSubscription = async () => {
    if (
      !selectedCustomer ||
      !selectedProduct ||
      !startDate ||
      !endDate ||
      numOfUsers <= 0
    ) {
      setAlert("Please fill all fields correctly.");
      return;
    }

    try {
      const isSubscribed = await addSubscription({
        selectedCustomer,
        selectedProduct,
        startDate,
        endDate,
        numOfUsers,
      });

      if (isSubscribed) {
        setAlert("This customer is already subscribed to this product.");
      } else {
        setAlert("Subscription added successfully!");
        navigate("/"); // Redirect to Dashboard
      }
    } catch (error) {
      setAlert("Error adding subscription. Please try again.");
    }
  };

  if (isCustomersLoading || isProductsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Subscription</h2>

      {alert && <div className="alert alert-info mb-4">{alert}</div>}

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Customer</label>
          <select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          >
            <option value="">Select Customer</option>
            {customers?.map((customer: any) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">Product</label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          >
            <option value="">Select Product</option>
            {products?.map((product: any) => (
              <option key={product.name} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">
            Number of Users
          </label>
          <input
            type="number"
            value={numOfUsers}
            onChange={(e) => setNumOfUsers(Number(e.target.value))}
            min={1}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="button"
          onClick={handleAddSubscription}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Subscription
        </button>
      </form>
    </div>
  );
};

export default AddSubscriptionPage;
