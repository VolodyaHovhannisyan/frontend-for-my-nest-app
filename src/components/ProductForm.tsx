import { useState } from "react";
import type { Product } from "../hooks/useProducts";
import api from "../services/api";
import { useAuthStore } from "../store/authStore";

interface Props {
  onSubmit: (product: Product) => void;
}

export default function ProductForm({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = "";
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await api.post("/products/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      imageUrl = res.data.imageUrl;
    }

    onSubmit({ name, price: Number(price), imageUrl });
    setName("");
    setPrice("");
    setFile(null);
  };

  const { isAdmin } = useAuthStore();

  if (!isAdmin()) {
    return <p className="text-center text-red-500 mt-8">Access Denied</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-amber-800 p-4 rounded-2xl shadow space-y-2"
    >
      <input
        className="w-full border p-2 rounded-lg"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="w-full border p-2 rounded-lg"
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) =>
          setPrice(e.target.value === "" ? "" : Number(e.target.value))
        }
        required
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="h-10 bg-amber-200 rounded-lg hover:cursor-pointer hover:bg-amber-500"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-gray-600 py-2 rounded-lg hover:bg-blue-700"
      >
        Add Product
      </button>
    </form>
  );
}
