import { useEffect, useState } from "react";
import api from "../services/api";

export interface Product {
  id?: number;
  name: string;
  price: number;
  imageUrl?: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products");
      setProducts(res.data?.data);
    } catch (err) {
      setError("Failed to fetch products");
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Product) => {
    try {
      await api.post("/products", product);
      await fetchProducts();
    } catch {
      setError("Failed to add product");
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await api.delete(`/products/${id}`);
      await fetchProducts();
    } catch {
      setError("Failed to delete product");
    }
  };

  const editProduct = async (updated: Product) => {
    if (!updated.id) return;
    try {
      // Optimistic UI update
      setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      await api.patch(`/products/${updated.id}`, updated);
    } catch {
      setError("Failed to update product");
      await fetchProducts(); // revert on error
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, addProduct, deleteProduct, editProduct };
};
