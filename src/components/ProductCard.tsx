import { useState } from "react";
import type { Product } from "../hooks/useProducts";
import Button from "./Button";

interface Props {
  product: Product;
  onDelete: (id: number) => void;
  onEdit: (updated: Product) => void;
}

export default function ProductCard({ product, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);

  const handleSave = () => {
    onEdit({ ...product, name, price });
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-cyan-800 shadow rounded-2xl p-4 flex justify-between items-center">
      {isEditing ? (
        <div className="flex flex-1 gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-1 rounded w-full"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="border p-1 rounded w-24"
          />
        </div>
      ) : (
        <div>
          {product.imageUrl && (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-xl"
            />
          )}
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-gray-500 dark:text-amber-400">${product.price}</p>
        </div>
      )}

      <div className="flex gap-2">
        {isEditing ? (
          <Button onClick={handleSave}>Save</Button>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        )}
        <Button
          onClick={() => product.id && onDelete(product.id)}
          className="bg-red-500 hover:bg-red-700"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
