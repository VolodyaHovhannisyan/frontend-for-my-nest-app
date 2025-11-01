import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import { useProductStore } from "../store/productStore";

export default function HomePage() {
  const {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    editProduct,
    deleteProduct,
  } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <ProductForm onSubmit={addProduct} />
      <div className="space-y-3">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onDelete={deleteProduct}
            onEdit={editProduct}
          />
        ))}
      </div>
    </div>
  );
}
