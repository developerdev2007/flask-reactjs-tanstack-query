// src/types/index.ts
export interface Customer {
  id: string;
  name: string;
  pan: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  costPerUser: number;
}

export interface Subscription {
  id: string;
  customerId: string;
  productName: string;
  startDate: string;
  endDate: string | null;
  noOfUsers: number;
}
export interface IFormaData {
  id?: number;
  customerId: string;
  productName: string;
  startDate: string;
  endDate: string;
  noOfUsers: number;
}
