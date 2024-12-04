import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getSubscriptions,
  extendSubscription,
} from "../services/subscriptionService";
import { useNavigate } from "react-router-dom";

const ExtendSubscriptionPage = () => {
  const [selectedSubscription, setSelectedSubscription] = useState<string>("");
  const [newEndDate, setNewEndDate] = useState<string>("");
  const [alert, setAlert] = useState<string>("");

  const { data: subscriptions, isLoading: isSubscriptionsLoading } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: getSubscriptions,
  });

  const mutation = useMutation({
    mutationFn: extendSubscription,
    onSuccess: () => {
      setAlert("Subscription extended successfully!");
    },
    onError: () => {
      setAlert("Error extending subscription. Please try again.");
    },
  });

  const navigate = useNavigate();

  const handleExtendSubscription = () => {
    if (!selectedSubscription || !newEndDate) {
      setAlert("Please select a subscription and enter a new end date.");
      return;
    }

    mutation.mutate({ id: selectedSubscription, updatedData: newEndDate });
  };

  if (isSubscriptionsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Extend Subscription</h2>

      {alert && <div className="alert alert-info mb-4">{alert}</div>}

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label className="block font-medium text-gray-700">
            Select Subscription
          </label>
          <select
            value={selectedSubscription}
            onChange={(e) => setSelectedSubscription(e.target.value)}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          >
            <option value="">Select Subscription</option>
            {subscriptions?.map((subscription: any) => (
              <option key={subscription.id} value={subscription.id}>
                {`${subscription.customerName} - ${subscription.productName}`}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">
            New End Date
          </label>
          <input
            type="date"
            value={newEndDate}
            onChange={(e) => setNewEndDate(e.target.value)}
            className="w-full mt-2 p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="button"
          onClick={handleExtendSubscription}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Extend Subscription
        </button>
      </form>
    </div>
  );
};

export default ExtendSubscriptionPage;
