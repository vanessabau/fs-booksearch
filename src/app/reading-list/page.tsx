// src/app/page.tsx (no 'use client')

export default async function Home() {
    const res = await fetch('http://localhost:3000/api/hello', {
        cache: 'no-store', // if you want to avoid caching
    })
    const data = await res.json()

    return (
        <main>
            <h1>Server Fetch</h1>
            <h2>Reading List</h2>
            <p>API says: {data.message}</p>
        </main>
    )
}

