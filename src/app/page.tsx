'use client';
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Header } from '@/components/header/header';
import styles from './page.module.css';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    subtitle?: string;
    authors?: string[];
    averageRating?: number;
    description?: string;
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
    };
    infoLink?: string;
    ratingsCount?: number;
    publishedDate?: string;
  };
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);

  const searchBooks = async () => {
    try {
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
          q: query,
        },
      });
      setBooks(response.data.items);
    } catch (error) {
      console.error('Error fetching data from Google Books API', error);
    }
  };
console.log(books);
  return (
      <div className={styles.page}>
        <main className={styles.main}>
          <Header/>
          <section className={styles.bookSection}>
          <div className={styles.searchContainer}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for books"
                className={styles.search}
            />
            <button onClick={searchBooks} className={styles.searchButton}>Search</button>
          </div>

          <div>
            {books.length > 0 && (
                <ul className={styles.bookList}>
                  {books.map((book) => (
                      <li key={book.id}>
                        {book.volumeInfo.title} by {book.volumeInfo.authors?.join(', ')}
                      </li>
                  ))}
                </ul>
            )}
          </div>
          </section>
          <div className={styles.ctas}>
            <a
                className={styles.primary}
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
              <Image
                  className={styles.logo}
                  src="/vercel.svg"
                  alt="Vercel logomark"
                  width={20}
                  height={20}
              />
              Deploy now
            </a>

          </div>
        </main>
        <footer className={styles.footer}>
          <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
          >
            <Image
                aria-hidden
                src="/file.svg"
                alt="File icon"
                width={16}
                height={16}
            />
            Learn
          </a>
          <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
          >
            <Image
                aria-hidden
                src="/window.svg"
                alt="Window icon"
                width={16}
                height={16}
            />
            Examples
          </a>
          <a
              href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
          >
            <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </div>
  );
}