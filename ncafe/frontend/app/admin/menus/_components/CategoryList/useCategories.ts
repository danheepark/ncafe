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
                const baseApiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
                const baseUrl = baseApiUrl.endsWith('/') ? baseApiUrl.slice(0, -1) : baseApiUrl;
                const path = '/admin/categories';
                const url = new URL(`${baseUrl}${path}`, window.location.origin);

                console.log(`[useCategories] Fetching from: ${url.toString()}`);

                const response = await fetch(url.toString(), {
                    credentials: 'include',
                });

                if (!response.ok) {
                    const errText = await response.text();
                    console.error(`[useCategories] API Error: ${response.status} - ${errText}`);
                    throw new Error(`Failed to fetch categories: ${response.status}`);
                }

                const data = await response.json();
                console.log("[useCategories] Raw Data:", data);

                // data가 categories 프로퍼티를 가진 객체인 경우와 배열인 경우 모두 처리
                const categoryList = Array.isArray(data) ? data : (data?.categories || []);

                const mappedData = categoryList
                    .filter((item: any) => item !== null && item !== undefined)
                    .map((item: any) => ({
                        id: String(item.id || ''),
                        name: item.name || 'Unknown',
                        icon: item.icon || '📋'
                    }));

                console.log("[useCategories] Mapped Data:", mappedData);
                setCategories(mappedData);
            } catch (error) {
                console.error("[useCategories] Error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, isLoading };
};
