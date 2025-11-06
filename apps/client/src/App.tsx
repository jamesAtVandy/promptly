import { useEffect, useState } from 'react'
import { createItem, deleteItem, fetchItems, Item } from './api'

export default function App() {
  const [message, setMessage] = useState<string>('loading...')
  const [items, setItems] = useState<Item[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function refresh() {
    try {
      setError(null)
      const data = await fetchItems()
      setItems(data)
    } catch (e: any) {
      setError(e.message)
    }
  }

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('backend not reachable'))
    refresh()
  }, [])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    setLoading(true)
    try {
      await createItem({ title: title.trim(), description: description.trim() || undefined })
      setTitle('')
      setDescription('')
      await refresh()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function onDelete(id?: string) {
    if (!id) return
    try {
      await deleteItem(id)
      await refresh()
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24, maxWidth: 720 }}>
      <h1>promptlyV1</h1>
      <p>Backend says: {message}</p>

      <h2>Create Item</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8, marginBottom: 16 }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Add'}
        </button>
      </form>

      {error && (
        <p style={{ color: 'crimson' }}>Error: {error}</p>
      )}

      <h2>Items</h2>
      {items.length === 0 ? (
        <p>No items yet</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
          {items.map((it) => (
            <li key={it._id} style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{it.title}</strong>
                  {it.description ? <div style={{ color: '#555' }}>{it.description}</div> : null}
                </div>
                <button onClick={() => onDelete(it._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p>Open <code>apps/client/src/App.tsx</code> to edit the UI.</p>
    </div>
  )
}
