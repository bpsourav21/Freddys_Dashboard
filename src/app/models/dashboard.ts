import { Dictionary } from "@reduxjs/toolkit";

export interface ProductDto {
  id: string;
  image: string;
  name: string;
}

export interface SellItemDto {
  product: ProductDto;
  revenue: number;
  units: number;
}

export interface SalesOverTimeDto {
  orders: number;
  total: number;
}

export interface DashboardDto {
  dashboard: {
    bestsellers: SellItemDto[];
    sales_over_time_week: Dictionary<SalesOverTimeDto>;
    sales_over_time_year: Dictionary<SalesOverTimeDto>;
  };
}

export interface AddressDto {
  city: string;
  street: string;
  zipcode: string;
}

export interface CustomerDto {
  address: AddressDto;
  id: string;
  name: string;
  surname: string;
}

export interface OrderDto {
  created_at: string;
  currency: string;
  customer: CustomerDto;
  id: string;
  product: ProductDto;
  status: string;
  total: number;
}
