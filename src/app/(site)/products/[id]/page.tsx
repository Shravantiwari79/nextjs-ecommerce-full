export const revalidate = 60 // ISR

async function getProduct(id: string) {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  const res = await fetch(`${base}/api/products/${id}`, { cache: "no-store" })
  if (!res.ok) return null
  return res.json()
}


export default async function ProductPage({ params }: any) {
  const product = await getProduct(params.id)
  if (!product) return <div className="text-center mt-10 text-lg font-semibold text-gray-500">Product not found 😔</div>

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Product Image */}
        <div className="bg-gray-100 rounded-xl p-6 shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[320px] object-cover rounded-xl transition-transform hover:scale-105"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-5">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <div className="text-3xl font-extrabold text-blue-600">
            ₹{product.price}
          </div>

          <p className="text-sm text-gray-500">
            {product.inventory ?? 10} items available ✅
          </p>

          <button
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold transition"
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
