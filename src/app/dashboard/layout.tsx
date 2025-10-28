import "../globals.css"
import { LayoutDashboard, ShoppingBag, Users, DollarSign, Package, LogOut } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Dashboard | NextShop",
  description: "Admin dashboard for managing inventory, sales, and users",
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-50 text-gray-900">

        {/* Sidebar
        <aside className="hidden md:flex flex-col w-64 bg-gradient-to-b from-blue-700 to-purple-700 text-white p-6 space-y-6">
          <div className="text-2xl font-extrabold flex items-center gap-2 mb-6">
            <LayoutDashboard className="w-7 h-7" /> Dashboard
          </div>
          <nav className="space-y-3">
            <Link href="/dashboard" className="block py-2 px-3 rounded hover:bg-blue-600 transition">📊 Overview</Link>
            <Link href="/dashboard/products" className="block py-2 px-3 rounded hover:bg-blue-600 transition">🛍️ Products</Link>
            <Link href="/dashboard/orders" className="block py-2 px-3 rounded hover:bg-blue-600 transition">📦 Orders</Link>
            <Link href="/dashboard/users" className="block py-2 px-3 rounded hover:bg-blue-600 transition">👥 Users</Link>
            <Link href="/" className="block py-2 px-3 rounded hover:bg-blue-600 transition">🏠 Back to Home</Link>
          </nav>

          <div className="mt-auto">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition px-4 py-2 rounded text-sm font-medium">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </aside> */}

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-screen">
          <header className="bg-white shadow px-6 py-4 sticky top-0 z-20 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome, Admin 👋</p>
          </header>

          <div className="flex-1 p-6">{children}</div>
        </main>

      </body>
    </html>
  )
}
