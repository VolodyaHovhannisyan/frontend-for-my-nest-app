import { create } from "zustand";
import api from "../services/api";

export interface Product {
  id?: number;
  name: string;
  price: number;
  imageUrl?: string
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: (page?: number, search?: string) => Promise<void>
  addProduct: (product: Product) => Promise<void>;
  editProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  setSearch: (value: string) => void
  nextPage: () => void
  prevPage: () => void
  page: number
  totalPages: number
  search: string
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  search: '',

  fetchProducts: async (page = get().page, search = get().search) => {
    try {
      set({ loading: true });
      const res = await api.get("/products", {
        params: { page, limit: 2, search },
      });
      set({
        products: res.data.data,
        totalPages: res.data.totalPages,
        page: res.data.page,
        loading: false
      });
    } catch (err) {
      set({ error: "Failed to load products", loading: false });
      console.log(err);
    } finally {
      set({ loading: false })
    }
  },

  setSearch: (value) => {
    set({ search: value, page: 1 })
  },

  nextPage: () => {
    const { page, totalPages } = get()
    if (page < totalPages) get().fetchProducts(page + 1)
  },

  prevPage: () => {
    const { page } = get()
    if (page > 1) get().fetchProducts(page - 1)
  },


  addProduct: async (product) => {
    try {
      const res = await api.post("/products", product);
      set((state) => ({ products: [...state.products, res.data] }));
    } catch {
      set({ error: "Failed to add product" });
    }
  },

  editProduct: async (product) => {
    if (!product.id) return;
    try {
      set((state) => ({
        products: state.products.map((p) =>
          p.id === product.id ? product : p
        ),
      }));
      await api.patch(`/products/${product.id}`, product);
    } catch {
      set({ error: "Failed to edit product" });
    }
  },

  deleteProduct: async (id) => {
    try {
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      }));
      await api.delete(`/products/${id}`);
    } catch {
      set({ error: "Failed to delete product" });
    }
  },
}));
