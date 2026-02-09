import { useState, useEffect } from 'react';

export interface MenuResponse {
    id: number;
    korName: string;
    engName: string;
    description: string;
    price: string;
    categoryId: number;
    isAvailable: boolean;
    createdAt: string;
    updatedAt: string;
    imageSrc: string;
}

export function useMenus(selectedCategory: string | number | null | undefined, searchQuery: string | undefined) {
    const [menus, setMenus] = useState<MenuResponse[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchMenus = async () => {
            const param = new URLSearchParams();
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
                const url = new URL(`${apiUrl}/admin/menus`);
                if (selectedCategory && selectedCategory !== 'all') {
                    param.set('categoryId', String(selectedCategory));
                }
                if (searchQuery) {
                    param.set('searchQuery', searchQuery);
                }

                url.search = param.toString();

                const response = await fetch(url.toString(), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) throw new Error('Failed to fetch menus');

                const data = await response.json();
                console.log("API Raw Data:", data);

                setMenus(data.menus);
                setTotal(data.total);
            } catch (err) {
                console.error('Failed to fetch menus:', err);
            }
        };

        fetchMenus();
    }, [selectedCategory, searchQuery]);

    return { menus, total };
}
