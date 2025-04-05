'use client'

import { useEffect, useState } from 'react'

export default function Home() {
    const [message, setMessage] = useState('')

    useEffect(() => {
        fetch('/api/hello')
            .then((res) => res.json())
            .then((data) => setMessage(data.message))
    }, [])

    return (
        <main>
            <h1>Client Fetch</h1>
            <h2>Saved Books</h2>
            <p>API says: {message}</p>
        </main>
    )
}
