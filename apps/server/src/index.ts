import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { getDb } from './db'
import itemsRouter from './routes/items'

dotenv.config()

const app = express()
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/hello', async (_req, res) => {
  try {
    // Touch the DB lazily to validate connection on first call
    const db = await getDb()
    const collections = await db.listCollections().toArray()
    res.json({ message: `Hello from backend! Collections: ${collections.length}` })
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Unknown error' })
  }
})

app.use('/api/items', itemsRouter)

app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`)
})
