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
    imageUrls: string[];
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

                const baseApiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
                const baseUrl = baseApiUrl.endsWith('/') ? baseApiUrl.slice(0, -1) : baseApiUrl;
                const url = new URL(`${baseUrl}/admin/menus/${id}`, window.location.origin);

                console.log(`[useMenuDetail] Fetching from: ${url.toString()}`);

                const response = await fetch(url.toString(), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error(`[useMenuDetail] API Error: ${response.status} - ${errorText}`);
                    throw new Error(`메뉴를 불러오는데 실패했습니다 (Error: ${response.status})`);
                }

                const data: MenuDetail = await response.json();
                console.log("[useMenuDetail] Data received:", data);
                setMenu(data);
            } catch (err) {
                console.error('[useMenuDetail] Failed to fetch menu detail:', err);
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
