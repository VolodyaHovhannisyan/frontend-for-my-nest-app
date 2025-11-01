import { useState } from "react";
import type { Product } from "../hooks/useProducts";

interface Props {
  onSubmit: (product: Product) => void;
}

export default function ProductForm({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || price === "") return;
    onSubmit({ name, price: Number(price) });
    setName("");
    setPrice("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-amber-800 p-4 rounded-2xl shadow space-y-2">
      <input
        className="w-full border p-2 rounded-lg"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="w-full border p-2 rounded-lg"
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Add Product
      </button>
    </form>
  );
}
