import { useState, useEffect } from 'react';

// API 응답에 맞는 메뉴 상세 타입
export interface MenuDetail {
    id: number;
    korName: string;
    engName: string;
    categoryName: string;
    price: number;
    isAvailable: boolean;
    createdAt: string;
    description: string;
    imageSrc: string;
}

export function useMenuDetail(id: string) {
    const [menu, setMenu] = useState<MenuDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                setLoading(true);
                setError(null);

                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
                const response = await fetch(`${apiUrl}/admin/menus/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('메뉴를 불러오는데 실패했습니다.');
                }

                const data: MenuDetail = await response.json();
                setMenu(data);
            } catch (err) {
                console.error('Failed to fetch menu detail:', err);
                setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchMenu();
        }
    }, [id]);

    return { menu, loading, error };
}
