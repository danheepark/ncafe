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
                const baseApiUrl = process.env.NEXT_PUBLIC_API_URL || '/api/v1';
                const baseUrl = baseApiUrl.endsWith('/') ? baseApiUrl.slice(0, -1) : baseApiUrl;
                const url = new URL(`${baseUrl}/admin/categories`, window.location.origin);
                const response = await fetch(url.toString());
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
