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
            try {
                // 1. 강사님 가이드: URL 객체를 사용하여 안전하게 주소 생성
                // NEXT_PUBLIC_API_URL이 있으면 사용하고, 없으면 기본값 /api/v1 사용
                const baseApiUrl = process.env.NEXT_PUBLIC_API_URL || '/api/v1';
                // baseApiUrl 뒤에 경로를 붙일 때 슬래시가 중복되지 않도록 처리
                const baseUrl = baseApiUrl.endsWith('/') ? baseApiUrl.slice(0, -1) : baseApiUrl;
                const url = new URL(`${baseUrl}/admin/menus`, window.location.origin);

                // 2. 쿼리 스트링 세팅: url.searchParams 활용
                // 별도의 URLSearchParams 객체를 만들지 않고 URL 객체의 내장 기능을 사용합니다.
                if (selectedCategory && selectedCategory !== 'all') {
                    url.searchParams.set('categoryId', String(selectedCategory));
                }
                if (searchQuery) {
                    url.searchParams.set('searchQuery', searchQuery);
                }

                // 3. 최종 요청: url.toString()으로 변환하여 fetch 호출
                const response = await fetch(url.toString(), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log(`Fetching from: ${url.toString()}, Status: ${response.status}`);

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('API Error Response:', errorText);
                    throw new Error(`Failed to fetch menus: ${response.status}`);
                }

                const data = await response.json();
                console.log("API Raw Data:", data);

                // 응답 데이터 구조에 따른 안전한 처리
                if (data && data.menus) {
                    setMenus(data.menus);
                    setTotal(data.total || data.menus.length);
                } else if (Array.isArray(data)) {
                    // 혹시라도 배열 형태로 바로 오는 경우 대비
                    setMenus(data);
                    setTotal(data.length);
                } else {
                    console.warn('Unexpected API data format:', data);
                    setMenus([]);
                    setTotal(0);
                }
            } catch (err) {
                console.error('Failed to fetch menus:', err);
                setMenus([]);
            }
        };

        fetchMenus();
    }, [selectedCategory, searchQuery]);

    return { menus, total };
}
