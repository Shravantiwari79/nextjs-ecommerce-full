import Link from "next/link"

export default function ProductCard({ product }: any) {
  // 🧠 SAFETY CHECK: Prevent crash if product is undefined
  if (!product || !product.name) {
    return (
      <div className="bg-gray-100 rounded-md p-4 text-center text-gray-500">
        Product unavailable
      </div>
    )
  }

  return (
    <div
      data-name={product.name?.toLowerCase()}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 p-4 cursor-pointer"
    >
      <img
        src={product.image || "/placeholder.png"}
        alt={product.name || "Product"}
        className="w-full h-48 object-cover rounded-md mb-3"
      />
      <h3 className="text-lg font-semibold group-hover:text-purple-600 transition">
        {product.name}
      </h3>
      <p className="text-gray-600 text-sm">{product.category || "Uncategorized"}</p>
      <p className="text-xl font-bold text-purple-700 mt-2">₹{product.price || 0}</p>
      <div className="mt-3">
        <Link
          href={`/products/${product._id}`}
          className="text-indigo-600 hover:underline font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
