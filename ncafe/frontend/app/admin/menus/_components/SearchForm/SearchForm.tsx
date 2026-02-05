"use client";

import styles from './SearchForm.module.css';

interface SearchFormProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export default function SearchForm({ searchQuery, onSearchChange }: SearchFormProps) {
    return (
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <input
                type="text"
                placeholder="메뉴명을 검색하세요"
                className={styles.input}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            <button type="submit" className={styles.button}>
                검색
            </button>
        </form>
    );
}
