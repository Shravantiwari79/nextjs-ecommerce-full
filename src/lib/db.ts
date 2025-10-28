import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || ''

if (!MONGODB_URI) {
  console.warn('⚠️ MONGODB_URI not set in environment')
}

// 👇 Extend Node.js global object type
declare global {
  // eslint-disable-next-line no-var
  var _mongoose: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  } | undefined
}

// ✅ Use cached connection if available
const globalCache = global._mongoose || { conn: null, promise: null }
global._mongoose = globalCache

export async function connectDB() {
  // ✅ Return existing connection
  if (globalCache.conn) return globalCache.conn

  // ✅ Create new connection promise if not yet created
  if (!globalCache.promise) {
    const opts = { bufferCommands: false }
    globalCache.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      console.log('✅ MongoDB connected successfully')
      return m
    }).catch(err => {
      console.error('❌ MongoDB connection failed:', err)
      throw err
    })
  }

  // ✅ Wait for connection to resolve and store it
  globalCache.conn = await globalCache.promise
  return globalCache.conn
}
