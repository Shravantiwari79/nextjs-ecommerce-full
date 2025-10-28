import '../../../src/app/globals.css'
import NavBar from '../../components/NavBar'
export const metadata = {
  title: "NextShop",
  description: "Modern E-Commerce App built with Next.js",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        {/* Navbar at top */}
        <NavBar />

        {/* Page Content */}
        <main className="flex-grow">{children}</main>

        {/* Footer will go here later if you want */}
      </body>
    </html>
  )
}
