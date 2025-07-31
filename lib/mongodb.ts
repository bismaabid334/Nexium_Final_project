// lib/mongodb.ts
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URL as string
if (!uri) throw new Error('Please add MONGODB_URL to .env.local')

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // In dev, use a global so we don’t create new connections on every HMR
  const globalWithMongo = global as typeof globalThis & { _mongoClient?: Promise<MongoClient> }
  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri).connect()
  }
  clientPromise = globalWithMongo._mongoClient
} else {
  clientPromise = new MongoClient(uri).connect()
}

export default clientPromise