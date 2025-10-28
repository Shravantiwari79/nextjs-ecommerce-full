'use client'

import { useState, useEffect } from "react"
import { LayoutDashboard, ShoppingBag, Users, DollarSign, Package, Menu, X } from "lucide-react"

export const dynamic = 'force-dynamic'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
        const res = await fetch(`${base}/api/products`, { cache: 'no-store' })
        const products = await res.json()

        const lowStock = products.filter((p: any) => p.inventory <= 5).length
        setStats({
          totalProducts: products.length,
          lowStock,
        })
      } catch (err) {
        console.error("Error fetching products:", err)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static inset-y-0 left-0 w-64 bg-gradient-to-b from-blue-700 to-purple-700 text-white p-5 transition-transform duration-300 z-40`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold flex items-center gap-2">
            <LayoutDashboard className="w-7 h-7" /> Dashboard
          </h2>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="space-y-3">
          <a href="/" className="block py-2 px-3 rounded hover:bg-blue-600 transition">🏠 Home</a>
          <a href="/products" className="block py-2 px-3 rounded hover:bg-blue-600 transition">🛍️ Products</a>
          <a href="/admin" className="block py-2 px-3 rounded hover:bg-blue-600 transition">⚙️ Admin Panel</a>
          <a href="/recommendations" className="block py-2 px-3 rounded hover:bg-blue-600 transition">✨ Recommendations</a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex justify-between items-center bg-white shadow px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
              <Menu className="w-7 h-7 text-gray-700" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Inventory Dashboard 📦</h1>
          </div>
          <div className="text-sm text-gray-500">Last updated: Just now</div>
        </header>

        {/* Stats Cards */}
        <main className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg transform hover:scale-105 transition">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium opacity-90">Total Products</div>
              <Package className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
          </div>

          <div className="p-5 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg transform hover:scale-105 transition">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium opacity-90">Low Stock Items</div>
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold">{stats.lowStock}</div>
          </div>

          <div className="p-5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg transform hover:scale-105 transition">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium opacity-90">Revenue</div>
              <DollarSign className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold">₹5.6L</div>
          </div>

          <div className="p-5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform hover:scale-105 transition">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium opacity-90">Users</div>
              <Users className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold">3,876</div>
          </div>
        </main>

        {/* Activity Section */}
        <section className="p-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Recent Activity</h2>
            <p className="text-gray-500 text-sm">
              {stats.totalProducts > 0
                ? "Inventory data fetched successfully!"
                : "Loading or no data found."}
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
