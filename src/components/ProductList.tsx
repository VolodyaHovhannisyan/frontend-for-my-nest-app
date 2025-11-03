import { useEffect } from 'react'
import { useProductStore } from '../store/productStore'

export default function ProductList() {
  const {
    products,
    page,
    totalPages,
    search,
    loading,
    // fetchProducts,
    setSearch,
    nextPage,
    prevPage,
  } = useProductStore()

  // Fetch when page or search changes
  useEffect(() => {
    // fetchProducts()
  }, [])

  return (
    <div className="p-6 space-y-6">
      {/* Search */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full"
        />
      </div>

      {/* Product Grid */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.length > 0 ? (
            products.map((p) => (
              <div key={p.id} className="border rounded-xl shadow-sm p-4">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h2 className="mt-2 font-semibold text-lg">{p.name}</h2>
                <p className="text-gray-500">${p.price}</p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products found.
            </p>
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center pt-4">
        <button
          onClick={prevPage}
          disabled={page <= 1}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-gray-600">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={page >= totalPages}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}
