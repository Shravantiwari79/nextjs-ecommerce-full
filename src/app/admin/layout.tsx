import "../globals.css"
import Link from "next/link"
import { Settings, Package, LayoutDashboard, Users, LogOut } from "lucide-react"

export const metadata = {
  title: "Admin Panel | NextShop",
  description: "Admin control panel for managing products, users, and settings",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-50 text-gray-900">

        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-gradient-to-b from-purple-700 to-indigo-700 text-white p-6 space-y-6">
          <div className="text-2xl font-extrabold flex items-center gap-2 mb-6">
            <Settings className="w-7 h-7" /> Admin Panel
          </div>

          <nav className="space-y-3">
            <Link href="/admin" className="block py-2 px-3 rounded hover:bg-purple-600 transition">
              ⚙️ Overview
            </Link>
            <Link href="/admin/products" className="block py-2 px-3 rounded hover:bg-purple-600 transition">
              🛍️ Manage Products
            </Link>
            <Link href="/admin/users" className="block py-2 px-3 rounded hover:bg-purple-600 transition">
              👥 Manage Users
            </Link>
            <Link href="/dashboard" className="block py-2 px-3 rounded hover:bg-purple-600 transition">
              📊 Dashboard
            </Link>
            <Link href="/" className="block py-2 px-3 rounded hover:bg-purple-600 transition">
              🏠 Back to Home
            </Link>
          </nav>

          <div className="mt-auto">
            <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 transition px-4 py-2 rounded text-sm font-medium">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-screen">
          <header className="bg-white shadow px-6 py-4 sticky top-0 z-20 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <Package className="w-6 h-6 text-purple-600" /> Admin Area
            </h1>
            <p className="text-sm text-gray-500">Welcome, Admin 👋</p>
          </header>

          <div className="flex-1 p-6">{children}</div>
        </main>
      </body>
    </html>
  )
}
