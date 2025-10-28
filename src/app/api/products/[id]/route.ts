import { NextResponse } from 'next/server'
import {connectDB} from '../../../../lib/db'
import Product from '../../../../models/Product'
import jwt from 'jsonwebtoken'

// ✅ Get single product
export async function GET(req: Request, { params }: any) {
  try {
    await connectDB()
    const product = await Product.findById(params.id)
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(product)
  } catch (err: any) {
    console.error('GET /api/products/[id] error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// ✅ Update existing product
export async function PUT(req: Request, { params }: any) {
  try {
    await connectDB()
    const token = req.headers.get('authorization')?.split(' ')[1]
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      
    console.log("🔒 VERIFY SECRET:", process.env.JWT_SECRET)


    jwt.verify(token, process.env.JWT_SECRET || 'secret')

    const body = await req.json()
    const updated = await Product.findByIdAndUpdate(params.id, body, { new: true })

    if (!updated) return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    return NextResponse.json(updated)
  } catch (err: any) {
    console.error('PUT /api/products/[id] error:', err)
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 })
  }
}

// ✅ Delete product
export async function DELETE(req: Request, { params }: any) {
  try {
    await connectDB()
    const token = req.headers.get('authorization')?.split(' ')[1]
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    jwt.verify(token, process.env.JWT_SECRET || 'secret')

    const deleted = await Product.findByIdAndDelete(params.id)
    if (!deleted) return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('DELETE /api/products/[id] error:', err)
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 })
  }
}
