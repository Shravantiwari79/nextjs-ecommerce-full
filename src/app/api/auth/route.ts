import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'secret'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123' // set in env for production

export async function POST(req: Request) {
  const { password } = await req.json()
  if (!password || password !== ADMIN_PASSWORD) {
    return new NextResponse('Invalid credentials', { status: 401 })
  }
  const token = jwt.sign({ role: 'admin' }, SECRET, { expiresIn: '12h' })
  return NextResponse.json({ token })
}
