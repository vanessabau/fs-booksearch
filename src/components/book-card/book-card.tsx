import React from "react";
import styles from "./book-card.module.css";

export const BookCard: React.FC<{
    title?: string;
    authors?: string[];
    imageLinks?: {
        smallThumbnail?: string;
        thumbnail?: string;
    };
    description?: string;
}> = ({title, authors, imageLinks, description}) => {
    return (
        <div className={styles.bookCard}>
            {imageLinks && imageLinks.thumbnail && (
                <>
                    <img src={imageLinks.thumbnail} alt={title}/>

                    <div className={styles.bookDetails}>
                        <h2>{title}</h2>
                        {authors && authors.length > 0 && (
                            <p>Authors: {authors.join(", ")}</p>
                        )}
                        {description && <p>{description}</p>}
                    </div>
                </>
            )}
        </div>
    );
}