import ProductCard from "../../components/ProductCard"
import { Sparkles } from "lucide-react"

export const revalidate = 0 // Always fetch fresh data

export default async function Recommendations() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  let products: any[] = []

  try {
    const res = await fetch(`${base}/api/products`, { cache: "no-store" })
    if (!res.ok) throw new Error("Failed to fetch products")
    const data = await res.json()
    products = Array.isArray(data) ? data.filter((p: any) => p && p.name) : []
  } catch (error) {
    console.error("Error fetching recommendations:", error)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-10 px-6 md:px-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 flex justify-center items-center gap-3">
          <Sparkles className="w-8 h-8 text-purple-600 animate-pulse" />
          Recommended for You
        </h1>
        <p className="text-gray-600 mt-2">
          Handpicked items based on popular trends and your preferences ✨
        </p>
      </div>
      

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.slice(0, 6).map((p: any) =>
            p && p._id ? (
              <div
                key={p._id}
                className="transform hover:scale-105 transition duration-300 hover:shadow-2xl"
              >
                <ProductCard product={p} />
              </div>
            ) : null
          )
        ) : (
          <div className="text-center text-gray-500 col-span-full mt-10">
            No recommendations available right now 😔
          </div>
        )}
      </div>
    </div>
  )
}
