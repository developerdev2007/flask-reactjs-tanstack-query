import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getSubscriptions,
  endSubscription,
} from "../services/subscriptionService";
import { useNavigate } from "react-router-dom";

const EndSubscriptionPage = () => {
  const [selectedSubscription, setSelectedSubscription] = useState<string>("");
  const [alert, setAlert] = useState<string>("");

  const { data: subscriptions, isLoading: isSubscriptionsLoading } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: getSubscriptions,
  });

  const mutation = useMutation({
    mutationFn: endSubscription,
    onSuccess: () => {
      setAlert("Subscription ended successfully!");
    },
    onError: () => {
      setAlert("Error ending subscription. Please try again.");
    },
  });

  const navigate = useNavigate();

  const handleEndSubscription = () => {
    if (!selectedSubscription) {
      setAlert("Please select a subscription to end.");
      return;
    }

    mutation.mutate({ id: selectedSubscription });
  };

  if (isSubscriptionsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">End Subscription</h2>

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

        <button
          type="button"
          onClick={handleEndSubscription}
          className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          End Subscription
        </button>
      </form>
    </div>
  );
};

export default EndSubscriptionPage;
