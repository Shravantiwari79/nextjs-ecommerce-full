import ProductCard from "../../components/ProductCard"

export const revalidate = 0 // disable caching for latest updates

async function getProducts() {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  const res = await fetch(`${base}/api/products`, { cache: "no-store" })
  return res.json()
}


export default async function Home() {
  const products = await getProducts()

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide">
          🛍️ Latest Products
        </h1>
      </div>

      {/* Search Bar */}
      <input
        id="search"
        placeholder="🔍 Search for products..."
        className="border border-gray-300 rounded-lg p-3 mb-8 w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      {/* Product Grid */}
      <div id="products" className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p: any) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>

      {/* Search Logic */}
      <script dangerouslySetInnerHTML={{ __html: `
        document.getElementById('search').addEventListener('input', function(e){
          const q = e.target.value.toLowerCase();
          document.querySelectorAll('[data-name]').forEach(card => {
            const name = card.getAttribute('data-name').toLowerCase();
            card.style.display = name.includes(q) ? 'block' : 'none';
          });
        });
      `}} />
    </div>
  )
}
