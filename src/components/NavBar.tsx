'use client'

import Link from "next/link"
import { useState } from "react"
import { ShoppingCart, Menu, X, User, Search } from "lucide-react"

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white sticky top-0 z-50 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-wide hover:scale-105 transition-transform duration-200 flex items-center gap-2"
          >
            🛍️ NextShop
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-yellow-300 transition">Home</Link>
            <Link href="/dashboard" className="hover:text-yellow-300 transition">Dashboard</Link>
            <Link href="/admin" className="hover:text-yellow-300 transition">Admin</Link>
            <Link href="/recommendations" className="hover:text-yellow-300 transition">Recommendations</Link>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-white text-gray-800 rounded-full pl-10 pr-4 py-1.5 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <Link href="/cart" className="relative group">
                <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                  3
                </span>
              </Link>

              <Link href="/login" className="hover:scale-110 transition-transform">
                <User className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>
      

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gradient-to-b from-purple-600 to-pink-600 transition-all duration-500 ease-in-out overflow-hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center space-y-3 py-4 text-lg font-medium">
          <Link href="/" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link href="/dashboard" onClick={() => setMobileOpen(false)}>Dashboard</Link>
          <Link href="/admin" onClick={() => setMobileOpen(false)}>Admin</Link>
          <Link href="/recommendations" onClick={() => setMobileOpen(false)}>Recommendations</Link>
          <Link href="/cart" onClick={() => setMobileOpen(false)}>Cart 🛒</Link>
          <Link href="/login" onClick={() => setMobileOpen(false)}>Login 👤</Link>
        </div>
      </div>
    </nav>
  )
}
