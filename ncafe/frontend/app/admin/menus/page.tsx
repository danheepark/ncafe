"use client";

import Header from './_components/Header/Header';
import CategoryList from './_components/CategoryList/CategoryList';
import MenuList from './_components/MenuList/MenuList';
import styles from './MenusPage.module.css';
import { useState } from 'react';

/**
 * 어드민 메뉴 관리 페이지
 * 구조: Header(Title + Search) -> CategoryList(Tabs) -> MenuList(Grid)
 */
export default function MenusPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <main className={styles.pageWrapper}>
            <Header searchQuery={searchQuery} onSearchChange={handleSearch} />
            <CategoryList
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory} />
            <div className={styles.content}>
                <MenuList selectedCategory={selectedCategory} searchQuery={searchQuery} />
            </div>
        </main>
    );
}
