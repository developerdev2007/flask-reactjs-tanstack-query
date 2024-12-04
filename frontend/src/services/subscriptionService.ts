import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // Change this to your backend API URL

// Fetch all subscriptions
export const getSubscriptions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/subscriptions`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch subscriptions");
  }
};

// Add a new subscription
export const addSubscription = async (subscription: any) => {
  try {
    const response = await axios.post(`/api/subscriptions`, subscription);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add subscription");
  }
};

// Extend an existing subscription
export const extendSubscription = async ({
  id,
  updatedData,
}: {
  id: string;
  updatedData: any;
}) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/subscriptions/extend/${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to extend subscription");
  }
};

// End an existing subscription
export const endSubscription = async ({ id }: { id: string }) => {
  try {
    const response = await axios.put(`${BASE_URL}/subscriptions/end/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to end subscription");
  }
};

// Get revenue report
export const getRevenue = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/revenue`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch revenue");
  }
};
