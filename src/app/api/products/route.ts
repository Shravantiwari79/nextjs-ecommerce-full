import { NextResponse } from 'next/server'
import {connectDB} from '../../../lib/db'
import Product from '../../../models/Product'
import jwt from 'jsonwebtoken'

// ✅ Get all products
export async function GET() {
  try {
    await connectDB()
    const products = await Product.find()
    return NextResponse.json(products)
  } catch (err: any) {
    console.error('GET /api/products error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// ✅ Create a new product
export async function POST(req: Request) {
  try {
    await connectDB()
    const token = req.headers.get('authorization')?.split(' ')[1]
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        console.log("🔑 SIGN SECRET:", process.env.JWT_SECRET)

    jwt.verify(token, process.env.JWT_SECRET || 'secret')

    const data = await req.json()
    const created = await Product.create(data)
    return NextResponse.json(created)
  } catch (err: any) {
    console.error('POST /api/products error:', err)
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 })
  }
}
