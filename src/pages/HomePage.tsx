import { useEffect, useState } from "react";
import api from "../services/api";

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get("/products")
      .then((res) => setProducts(res.data))
      .catch(() => alert("Error fetching products"));
  }, []);
  

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Product List</h1>
      <ul className="space-y-3">
        {products.map((p) => (
          <li
            key={p.id}
            className="p-4 bg-white shadow rounded-2xl flex justify-between"
          >
            <span>{p.name}</span>
            <span className="text-gray-500">${p.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
