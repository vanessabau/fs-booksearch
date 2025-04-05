import React from "react";
import styles from "./header.module.css";

export const Header: React.FC<{
    title?: string;
    }> = ({ title="Book Search" }) => {
    return (
        <header className={styles.header}>
        <h1>{title}</h1>
        </header>
    );
}