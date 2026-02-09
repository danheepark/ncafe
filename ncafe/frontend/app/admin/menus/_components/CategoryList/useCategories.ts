//fetch 하는건 여기서 하고 사용하는건 CategoryList에서
import { useState, useEffect } from 'react';

export interface CategoryResponseDto {
    id: string;
    name: string;
    icon?: string;
}

export interface CategoryListResponseDto {
    categories: CategoryResponseDto[];
    totalCount: number;
}

export function useCategories() {
    const [categories, setCategories] = useState<CategoryResponseDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setIsLoading(true);
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
                const response = await fetch(`${apiUrl}/admin/categories`);
                if (!response.ok) throw new Error('Failed to fetch categories');

                const data = await response.json();
                const mappedData = data.map((item: any) => ({
                    id: String(item.id),
                    name: item.name,
                    icon: item.icon || '❤️'
                }));
                setCategories(mappedData);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, isLoading };
};
