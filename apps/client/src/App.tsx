import { useEffect, useState } from 'react'

export default function App() {
  const [message, setMessage] = useState<string>('loading...')

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('backend not reachable'))
  }, [])

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <h1>promptlyV1</h1>
      <p>Backend says: {message}</p>
      <p>Open <code>apps/client/src/App.tsx</code> to edit the UI.</p>
    </div>
  )
}
