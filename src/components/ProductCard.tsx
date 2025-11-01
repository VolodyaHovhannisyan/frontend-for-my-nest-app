import type { Product } from "../hooks/useProducts";

interface Props {
  product: Product;
  onDelete: (id: number) => void;
}

export default function ProductCard({ product, onDelete }: Props) {
  return (
    <div className="bg-white shadow rounded-2xl p-4 flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-gray-500">${product.price}</p>
      </div>
      <button
        className="text-red-500 hover:text-red-700"
        onClick={() => product.id && onDelete(product.id)}
      >
        Delete
      </button>
    </div>
  );
}
