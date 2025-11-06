import { MongoClient, Db } from 'mongodb'

let client: MongoClient | null = null
let db: Db | null = null

export async function getDb(): Promise<Db> {
  if (db && client) return db

  const uri = process.env.MONGODB_URI
  const dbName = process.env.MONGODB_DB_NAME
  if (!uri) throw new Error('MONGODB_URI is not set')
  if (!dbName) throw new Error('MONGODB_DB_NAME is not set')

  client = new MongoClient(uri)
  await client.connect()
  db = client.db(dbName)
  return db
}

export async function disconnect() {
  if (client) {
    await client.close()
    client = null
    db = null
  }
}
