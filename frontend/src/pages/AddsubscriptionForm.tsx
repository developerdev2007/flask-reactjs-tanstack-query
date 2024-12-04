// src/pages/AddSubscription.tsx
import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchCustomers,
  fetchProducts,
  addSubscription,
} from "../services/api";

const AddSubscription: React.FC = () => {
  const { data: customers } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
  });
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const mutation = useMutation({ mutationFn: addSubscription });

  const [formData, setFormData] = useState({
    customerId: "",
    productId: "",
    startDate: "",
    endDate: "",
    users: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync(formData);
      alert("Subscription added successfully!");
    } catch (error) {
      alert("Error adding subscription.");
    }
  };

  return (
    <div className="container mx-auto mt-6">
      <h2 className="text-3xl font-bold mb-4">Add Subscription</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2">Customer</label>
          <select
            value={formData.customerId}
            onChange={(e) =>
              setFormData({ ...formData, customerId: e.target.value })
            }
            className="border p-2 rounded w-full"
          >
            <option value="">Select a customer</option>
            {customers?.map((customer: any) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2">Product</label>
          <select
            value={formData.productId}
            onChange={(e) =>
              setFormData({ ...formData, productId: e.target.value })
            }
            className="border p-2 rounded w-full"
          >
            <option value="">Select a product</option>
            {products?.map((product: any) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2">Start Date</label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-2">End Date</label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Number of Users</label>
          <input
            type="number"
            value={formData.users}
            onChange={(e) =>
              setFormData({ ...formData, users: +e.target.value })
            }
            className="border p-2 rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Subscription
        </button>
      </form>
    </div>
  );
};

export default AddSubscription;
