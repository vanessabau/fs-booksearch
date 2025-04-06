'use client';
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Header } from '@/components/header/header';
import { BookCard } from '@/components/book-card/book-card';
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
                              book.volumeInfo.imageLinks && (
                                  <BookCard
                                      key={book.id}
                                      title={book.volumeInfo.title}
                                      authors={book.volumeInfo.authors}
                                      imageLinks={book.volumeInfo.imageLinks}
                                      description={book.volumeInfo.description}
                                  />
                              )
                          ))}
                      </ul>
                  )}
              </div>
          </section>
        </main>
        <footer className={styles.footer}>
          &copy; {new Date().getFullYear()} Azula Design
        </footer>
      </div>
  );
}