import { Router } from 'express'
import { getDb } from '../db'
import { ObjectId } from 'mongodb'

type Item = {
  _id?: ObjectId
  title: string
  description?: string
  createdAt: Date
}

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const db = await getDb()
    const items = await db
      .collection<Item>('items')
      .find({}, { sort: { createdAt: -1 } })
      .limit(100)
      .toArray()
    res.json(items)
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to fetch items' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body || {}
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'title is required' })
    }
    const db = await getDb()
    const doc: Item = { title, description, createdAt: new Date() }
    const result = await db.collection<Item>('items').insertOne(doc)
    res.status(201).json({ _id: result.insertedId, ...doc })
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to create item' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'invalid id' })
    const { title, description } = req.body || {}
    const db = await getDb()
    const coll = db.collection<Item>('items')
    const _id = new ObjectId(id)
    const upd = await coll.updateOne({ _id }, { $set: { title, description } })
    if (upd.matchedCount === 0) return res.status(404).json({ error: 'not found' })
    const doc = await coll.findOne({ _id })
    if (!doc) return res.status(404).json({ error: 'not found' })
    res.json(doc)
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to update item' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'invalid id' })
    const db = await getDb()
    const result = await db.collection<Item>('items').deleteOne({ _id: new ObjectId(id) })
    if (result.deletedCount === 0) return res.status(404).json({ error: 'not found' })
    res.status(204).send()
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed to delete item' })
  }
})

export default router
