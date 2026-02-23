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
    imageUrls?: string[];
}

export default function MenuDetailGallery({ menuId, menuName, imageUrls = [] }: MenuDetailGalleryProps) {
    const [primaryIndex, setPrimaryIndex] = useState(0);

    // 이미지 URL 생성 (이미 절대경로인 경우 그대로 반환)
    const getImageUrl = (src: string) => {
        if (src.startsWith('http') || src.startsWith('/')) return src;
        return `/images/${src}`;
    };

    const handleAddImage = () => {
        alert('이미지 업로드 기능이 추가될 예정입니다.');
    };

    const handleDeleteImage = (index: number) => {
        if (confirm('이 이미지를 삭제하시겠습니까?')) {
            alert('이미지 삭제 기능이 추가될 예정입니다.');
        }
    };

    const handleSetPrimary = (index: number) => {
        setPrimaryIndex(index);
    };

    return (
        <div className={styles.gallerySection}>
            <div className={styles.gallerySectionHeader}>
                <h3 className={styles.sectionTitle}>이미지 관리</h3>
                <Button variant="outline" onClick={handleAddImage}>
                    <Plus size={16} />
                    <span>이미지 추가</span>
                </Button>
            </div>

            {imageUrls.length > 0 ? (
                <div className={styles.galleryGrid}>
                    {imageUrls.map((url, index) => (
                        <div
                            key={index}
                            className={`${styles.galleryItem} ${index === primaryIndex ? styles.primary : ''}`}
                        >
                            <div className={styles.galleryImageWrapper}>
                                <Image
                                    src={getImageUrl(url)}
                                    alt={`${menuName} - ${index + 1}`}
                                    fill
                                    className={styles.galleryImage}
                                />
                            </div>
                            <div className={styles.galleryItemActions}>
                                <button
                                    className={`${styles.galleryAction} ${index === primaryIndex ? styles.isPrimary : ''}`}
                                    onClick={() => handleSetPrimary(index)}
                                    title="대표 이미지로 설정"
                                >
                                    <Star size={16} />
                                </button>
                                <button
                                    className={`${styles.galleryAction} ${styles.deleteAction}`}
                                    onClick={() => handleDeleteImage(index)}
                                    title="이미지 삭제"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            {index === primaryIndex && (
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
