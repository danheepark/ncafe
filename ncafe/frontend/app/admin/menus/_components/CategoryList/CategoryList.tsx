"use client";

import { useState } from 'react';
import styles from './CategoryList.module.css';
import { useCategories } from './useCategories';

interface CategoryListProps {
    selectedCategory: string | null;
    setSelectedCategory: (categoryId: string | null) => void;
}

export default function CategoryList({ selectedCategory, setSelectedCategory }: CategoryListProps) {
    const { categories } = useCategories();
    // const [selectedCategory, setSelectedCategory] = useState('all');

    // const onSelect = (id: string) => {
    //     // setSelectedCategory(id);
    //     console.log(`Category selected: ${id}`);
    //     // 부모 컴포넌트에 선택된 카테고리 ID 전달
    //     if (onCategoryChange) {
    //         onCategoryChange(id);
    //     }
    // };

    // '전체' 카테고리를 앞에 추가
    // const allCategories = [{ id: 'all', name: '전체' }, ...categories];

    return (
        <div className={styles.container}>
            {/*전체 탭*/}
            <button
                className={`${styles.tab} ${selectedCategory === null ? styles.active : ''}`}
                onClick={() => {
                    setSelectedCategory(null);
                }}
            >
                전체

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
                    {category.name}

                </button>
            ))}
        </div>
    );
}
