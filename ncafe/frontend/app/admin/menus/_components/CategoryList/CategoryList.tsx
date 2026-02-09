"use client";

import styles from './CategoryList.module.css';
import { useCategories } from './useCategories';

interface CategoryListProps {
    selectedCategory: string | null;
    setSelectedCategory: (categoryId: string | null) => void;
}

export default function CategoryList({ selectedCategory, setSelectedCategory }: CategoryListProps) {
    const { categories } = useCategories();

    return (
        <div className={styles.container}>
            {/*전체 탭*/}
            <button
                className={`${styles.tab} ${selectedCategory === null ? styles.active : ''}`}
                onClick={() => {
                    setSelectedCategory(null);
                }}
            >

                <div className={styles.tabContent}>
                    <span className="material-symbols-rounded" style={{ fontSize: '18px' }}>grid_view</span>
                    <span>전체</span>
                </div>

            </button>
            {/*카테고리 탭*/}
            {categories.map((category) => (
                <button
                    key={category.id}
                    className={`${styles.tab} ${selectedCategory === category.id ? styles.active : ''}`}
                    onClick={() => {
                        setSelectedCategory(category.id)
                    }}
                >
                    <div className={styles.tabContent}>
                        <span className={styles.categoryInfo}>
                            <span className={styles.icon}>{category.icon}</span>
                            <span>{category.name}</span>
                        </span>
                    </div>
                </button>
            ))}
        </div>
    );
}
