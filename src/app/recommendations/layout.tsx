import "../globals.css"
import NavBar from "../../components/ProductCard"

export const metadata = {
  title: "Recommendations | NextShop",
  description: "Personalized product recommendations powered by NextShop",
}

export default function RecommendationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen text-gray-900">
        {/* Navbar on top (shared across recommendation pages) */}
        <NavBar />

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-6 py-10">
          {children}
        </main>
      </body>
    </html>
  )
}
