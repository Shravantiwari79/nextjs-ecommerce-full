'use client'

import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { PlusCircle, LogIn, Package, Image as ImageIcon, Loader2, CheckCircle2 } from 'lucide-react'

export default function AdminPage() {
  const [products, setProducts] = useState<any[]>([])
  const [form, setForm] = useState({ name: '', slug: '', price: 0, inventory: 0, description: '', category: '', image: '' })
  const [token, setToken] = useState('')
  const [editId, setEditId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  // ✅ Fetch products
  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(setProducts)
    const t = localStorage.getItem('admin_token') || ''
    setToken(t)
  }, [])

  // ✅ Admin Login
  const login = async () => {
    const pwd = prompt('Enter admin password (default: admin123)')
    if (!pwd) return
    const res = await fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ password: pwd }),
      headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) { toast.error('Login failed'); return }
    const { token } = await res.json()
    localStorage.setItem('admin_token', token)
    setToken(token)
    toast.success('Logged in successfully!')
  }

  // ✅ Upload image to Cloudinary with progress bar
  const uploadImage = async (file: File) => {
    if (!file) return
    setUploading(true)
    setUploadSuccess(false)
    setUploadProgress(0)

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'your_cloud_name'
      const unsignedPreset = 'unsigned_preset' // Replace with your unsigned preset name

      const xhr = new XMLHttpRequest()
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', unsignedPreset)

      xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/upload`, true)

      // Progress listener
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded * 100) / e.total)
          setUploadProgress(percent)
        }
      })

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          const res = JSON.parse(xhr.responseText)
          if (res.secure_url) {
            setForm({ ...form, image: res.secure_url })
            setUploadSuccess(true)
            toast.success('Image uploaded successfully!')
          } else {
            toast.error('Upload failed')
          }
          setUploading(false)
          setUploadProgress(0)
        }
      }

      xhr.send(formData)
    } catch (err) {
      console.error(err)
      toast.error('Upload error')
      setUploading(false)
    }
  }

  // ✅ Create or Update product
  const saveProduct = async () => {
    if (!token) { toast.error('Login required'); return }

    const method = editId ? 'PUT' : 'POST'
    const url = editId ? `/api/products/${editId}` : '/api/products'

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify(form),
    })

    if (!res.ok) {
      toast.error('Failed to save product')
      return
    }

    const saved = await res.json()
    if (editId) {
      setProducts(products.map(p => p._id === editId ? saved : p))
      toast.success('Product updated!')
    } else {
      setProducts([saved, ...products])
      toast.success('Product created!')
    }

    setForm({ name: '', slug: '', price: 0, inventory: 0, description: '', category: '', image: '' })
    setEditId(null)
    setUploadSuccess(false)
  }

  // ✅ Edit and Delete Handlers
  const editProduct = (p: any) => {
    setForm({
      name: p.name,
      slug: p.slug,
      price: p.price,
      inventory: p.inventory,
      description: p.description,
      category: p.category,
      image: p.image,
    })
    setEditId(p._id)
    toast('Editing mode enabled')
  }

  const deleteProduct = async (id: string) => {
    if (!token) { toast.error('Login required'); return }
    if (!confirm('Are you sure you want to delete this product?')) return

    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + token },
    })

    if (!res.ok) {
      toast.error('Failed to delete')
      return
    }

    setProducts(products.filter(p => p._id !== id))
    toast.success('Product deleted!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10 px-6 md:px-12">
      <Toaster position="top-center" />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
            <Package className="w-8 h-8 text-purple-600" />
            Admin Panel
          </h1>
          {!token && (
            <button
              onClick={login}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-lg shadow hover:opacity-90 flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" /> Login
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Create/Edit Product */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h2 className="font-bold text-xl mb-4 flex items-center gap-2 text-indigo-600">
              <PlusCircle className="w-5 h-5" /> {editId ? 'Edit Product' : 'Create Product'}
            </h2>

            <div className="space-y-3">
              <input className="border border-gray-300 rounded-md p-2 w-full" placeholder="Name"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <input className="border border-gray-300 rounded-md p-2 w-full" placeholder="Slug"
                value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} />
              <input type="number" className="border border-gray-300 rounded-md p-2 w-full" placeholder="Price"
                value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} />
              <input type="number" className="border border-gray-300 rounded-md p-2 w-full" placeholder="Inventory"
                value={form.inventory} onChange={e => setForm({ ...form, inventory: Number(e.target.value) })} />

              {/* Cloudinary Upload with Progress */}
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-gray-600 flex items-center gap-2 cursor-pointer">
                  <ImageIcon className="w-5 h-5 text-indigo-500" />
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0]
                      if (file) uploadImage(file)
                    }}
                  />
                </label>

                {uploading && (
                  <div className="w-full bg-gray-200 h-2 rounded-md overflow-hidden">
                    <div
                      className="h-2 bg-indigo-500 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}

                {uploadSuccess && <CheckCircle2 className="text-green-500 w-5 h-5" />}
              </div>

              {form.image && (
                <img
                  src={form.image}
                  alt="Preview"
                  className="w-20 h-20 rounded-md object-cover border mx-auto transition hover:scale-105"
                />
              )}

              <textarea className="border border-gray-300 rounded-md p-2 w-full" placeholder="Description"
                value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />

              <button
                onClick={saveProduct}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-md hover:scale-[1.02] transition"
              >
                {editId ? 'Update Product' : 'Create Product'}
              </button>
            </div>
          </div>

          {/* Product List */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h2 className="font-bold text-xl mb-4 text-indigo-600">Products</h2>
            <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
              {products.length === 0 && <p className="text-gray-500 text-sm">No products found.</p>}
              {products.map(p => (
                <div key={p._id} className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-3 rounded-md shadow-sm">
                  <div className="flex items-center gap-3">
                    {p.image && <img src={p.image} alt={p.name} className="w-10 h-10 rounded object-cover" />}
                    <div>
                      <div className="font-semibold text-gray-800">{p.name}</div>
                      <div className="text-sm text-gray-600">₹{p.price} • {p.inventory} in stock</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => editProduct(p)} className="text-blue-600 hover:underline text-sm">Edit</button>
                    <button onClick={() => deleteProduct(p._id)} className="text-red-600 hover:underline text-sm">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
