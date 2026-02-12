'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Package, Plus, Trash2, Star } from 'lucide-react';
import Button from '@/components/common/Button/Button';
import { useMenuImages, MenuImage } from '../useMenuImages';
import styles from './MenuDetailGallery.module.css';

interface MenuDetailGalleryProps {
    menuId: number;
    menuName: string;
}

export default function MenuDetailGallery({ menuId, menuName }: MenuDetailGalleryProps) {
    const { images: fetchedImages, loading, error } = useMenuImages(String(menuId));
    const [primaryImageId, setPrimaryImageId] = useState<number | null>(null);

    // 이미지 로드 후 첫 번째 이미지를 대표 이미지로 설정 (sortOrder가 가장 낮은 것)
    useEffect(() => {
        if (fetchedImages.length > 0 && primaryImageId === null) {
            // sortOrder가 1인 이미지를 대표로, 없으면 첫 번째 이미지
            const primaryImage = fetchedImages.find(img => img.sortOrder === 1) || fetchedImages[0];
            setPrimaryImageId(primaryImage.id);
        }
    }, [fetchedImages, primaryImageId]);

    // 이미지 URL 생성
    const getImageUrl = (src: string) => {
        const baseApiUrl = process.env.NEXT_PUBLIC_API_URL || '/api/v1';
        const baseUrl = baseApiUrl.endsWith('/') ? baseApiUrl.slice(0, -1) : baseApiUrl;
        return `${baseUrl}/images/${src}`;
    };

    const handleAddImage = () => {
        // TODO: 이미지 업로드 기능 구현
        alert('이미지 업로드 기능이 추가될 예정입니다.');
    };

    const handleDeleteImage = (imageId: number) => {
        if (confirm('이 이미지를 삭제하시겠습니까?')) {
            // TODO: 이미지 삭제 API 호출
            alert('이미지 삭제 기능이 추가될 예정입니다.');
        }
    };

    const handleSetPrimary = async (imageId: number) => {
        setPrimaryImageId(imageId);
        // TODO: 대표 이미지 설정 API 호출
        console.log('대표 이미지로 설정:', imageId);
    };

    if (loading) {
        return (
            <div className={styles.gallerySection}>
                <div className={styles.gallerySectionHeader}>
                    <h3 className={styles.sectionTitle}>이미지 관리</h3>
                </div>
                <div className={styles.loading}>이미지 로딩 중...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.gallerySection}>
                <div className={styles.gallerySectionHeader}>
                    <h3 className={styles.sectionTitle}>이미지 관리</h3>
                </div>
                <div className={styles.error}>이미지 로딩 실패: {error}</div>
            </div>
        );
    }

    return (
        <div className={styles.gallerySection}>
            <div className={styles.gallerySectionHeader}>
                <h3 className={styles.sectionTitle}>이미지 관리</h3>
                <Button variant="outline" onClick={handleAddImage}>
                    <Plus size={16} />
                    <span>이미지 추가</span>
                </Button>
            </div>

            {fetchedImages.length > 0 ? (
                <div className={styles.galleryGrid}>
                    {fetchedImages.map((image) => (
                        <div
                            key={image.id}
                            className={`${styles.galleryItem} ${image.id === primaryImageId ? styles.primary : ''}`}
                        >
                            <div className={styles.galleryImageWrapper}>
                                <Image
                                    src={getImageUrl(image.srcUrl)}
                                    alt={image.altText} // 하드코딩 대신 서버에서 받은 altText 사용
                                    fill
                                    className={styles.galleryImage}
                                />
                            </div>
                            <div className={styles.galleryItemActions}>
                                <button
                                    className={`${styles.galleryAction} ${image.id === primaryImageId ? styles.isPrimary : ''}`}
                                    onClick={() => handleSetPrimary(image.id)}
                                    title="대표 이미지로 설정"
                                >
                                    <Star size={16} />
                                </button>
                                <button
                                    className={`${styles.galleryAction} ${styles.deleteAction}`}
                                    onClick={() => handleDeleteImage(image.id)}
                                    title="이미지 삭제"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            {image.id === primaryImageId && (
                                <span className={styles.primaryBadge}>대표</span>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.noImage}>
                    <Package size={48} />
                    <span>이미지 없음</span>
                    <p className={styles.noImageText}>이미지를 추가해주세요.</p>
                </div>
            )}
        </div>
    );
}
