const API_BASE = import.meta.env.VITE_API_BASE || '/api'

export type Item = {
  _id?: string
  title: string
  description?: string
  createdAt?: string
}

export async function fetchItems(): Promise<Item[]> {
  const res = await fetch(`${API_BASE}/items`)
  if (!res.ok) throw new Error('Failed to fetch items')
  return res.json()
}

export async function createItem(data: Pick<Item, 'title' | 'description'>): Promise<Item> {
  const res = await fetch(`${API_BASE}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create item')
  return res.json()
}

export async function updateItem(id: string, data: Partial<Pick<Item, 'title' | 'description'>>): Promise<Item> {
  const res = await fetch(`${API_BASE}/items/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update item')
  return res.json()
}

export async function deleteItem(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/items/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete item')
}

