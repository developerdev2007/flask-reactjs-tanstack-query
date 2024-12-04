// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchCustomers = async () => {
  const { data } = await api.get("/customers");
  return data;
};

export const fetchSubscriptions = async () => {
  const { data } = await api.get("/subscriptions");
  return data;
};
export const fetchProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};

export const addSubscription = async (subscriptionData: any) => {
  const { data } = await api.post("/subscriptions", subscriptionData, {
    withCredentials: true,
  });
  return data;
};

export const endSubscription = async (id: number) => {
  const { data } = await api.patch(`/subscriptions/${id}/end`);
  return data;
};
