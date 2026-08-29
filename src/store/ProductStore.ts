// src/store/productStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = {
  id: number;
  name: string;
  dis: string;
  price: number;
};

type ProductState = {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
};

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: [],
      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, product],
        })),
      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
    }),
    { name: "products-storage" }
  )
);