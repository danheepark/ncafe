'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/common/Button/Button';
import {
    MenuDetailHeader,
    MenuDetailInfo,
    MenuDetailGallery,
    MenuDetailOptions,
} from '..';
import { useMenuDetail } from '../useMenuDetail';
import styles from '../../MenuDetailPage.module.css';

// Props로 id를 받음 
interface MenuDetailContentProps {
    id: string;
}

export default function MenuDetailContent({ id }: MenuDetailContentProps) {
    const router = useRouter();

    // 커스텀 훅으로 데이터 fetching 로직 분리
    const { menu, loading, error } = useMenuDetail(id);

    const handleDelete = async () => {
        if (confirm('정말로 이 메뉴를 삭제하시겠습니까?')) {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
                const response = await fetch(`${apiUrl}/admin/menus/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    router.push('/admin/menus');
                } else {
                    alert('삭제에 실패했습니다.');
                }
            } catch (err) {
                alert('삭제 중 오류가 발생했습니다.');
            }
        }
    };

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>로딩 중...</p>
            </div>
        );
    }

    if (error || !menu) {
        return (
            <div className={styles.notFound}>
                <h2>{error || '메뉴를 찾을 수 없습니다'}</h2>
                <Link href="/admin/menus">
                    <Button variant="outline">목록으로 돌아가기</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Header - 제목과 액션 버튼 */}
            <MenuDetailHeader
                menuId={menu.id}
                menuName={menu.korName}
                onDelete={handleDelete}
            />

            {/* Main Content Grid */}
            <div className={styles.contentGrid}>
                {/* Left Column - Gallery & Options */}
                <div className={styles.leftColumn}>
                    {/* Gallery - 이미지 관리 */}
                    <MenuDetailGallery
                        menuId={menu.id}
                        menuName={menu.korName}
                    />

                    {/* Options - 메뉴 옵션 관리 (더미 데이터) */}
                    <MenuDetailOptions menuId={menu.id} />
                </div>

                {/* Right Column - Info */}
                <div className={styles.rightColumn}>
                    {/* Info - 메뉴 정보 */}
                    <MenuDetailInfo
                        korName={menu.korName}
                        engName={menu.engName}
                        description={menu.description}
                        price={menu.price}
                        categoryName={menu.categoryName}
                        isAvailable={menu.isAvailable}
                        createdAt={menu.createdAt}
                    />
                </div>
            </div>
        </div>
    );
}
