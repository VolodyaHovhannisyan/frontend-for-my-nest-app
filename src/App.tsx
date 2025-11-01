import { useEffect, useState } from "react";
import { getProducts, createProduct } from "./api/products";

interface Product {
  id: number;
  name: string;
  price: number;
  createdAt: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    const newProduct = await createProduct({ name, price: Number(price) });
    setProducts([newProduct, ...products]);
    setName("");
    setPrice("");
  }

  return (
    <div className="p-8 max-w-lg mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4">🛍️ Product List</h1>

      <form onSubmit={handleAddProduct} className="mb-6 space-y-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name"
          className="border p-2 w-full rounded"
          required
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          type="number"
          step="0.01"
          className="border p-2 w-full rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>

      <ul className="space-y-2">
        {products.map((p) => (
          <li
            key={p.id}
            className="border rounded p-3 flex justify-between items-center"
          >
            <span>{p.name}</span>
            <span className="text-gray-600">${p.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
