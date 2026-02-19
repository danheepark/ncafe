import { useState, useEffect } from 'react';

// 메뉴 이미지 타입
export interface MenuImage {
    id: number;
    menuId: number;
    srcUrl: string;
    sortOrder: number;
    createdAt: string;
    altText: string; // 추가된 필드
}

// API 응답 타입
export interface MenuImageListResponse {
    images: MenuImage[];
}

export function useMenuImages(menuId: string) {
    const [images, setImages] = useState<MenuImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMenuImages = async () => {
            try {
                setLoading(true);
                setError(null);

                // 강사님 가이드 방식 적용: /api/v1 경로와 URL 객체 사용
                const baseApiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
                const baseUrl = baseApiUrl.endsWith('/') ? baseApiUrl.slice(0, -1) : baseApiUrl;
                const url = new URL(`${baseUrl}/admin/menus/${menuId}/menu-images`, window.location.origin);

                const response = await fetch(url.toString(), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('이미지를 불러오는데 실패했습니다.');
                }

                const data: MenuImageListResponse = await response.json();
                setImages(data.images || []);
            } catch (err) {
                console.error('Failed to fetch menu images:', err);
                setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        if (menuId) {
            fetchMenuImages();
        }
    }, [menuId]);

    return { images, loading, error };
}
