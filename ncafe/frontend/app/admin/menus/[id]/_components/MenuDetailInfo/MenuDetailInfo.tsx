'use client';

import React from 'react';
import { CheckCircle, XCircle, Tag } from 'lucide-react';
import styles from './MenuDetailInfo.module.css';

interface MenuDetailInfoProps {
    korName: string;
    engName: string;
    description: string;
    price: number;
    categoryName: string;
    isAvailable: boolean;
    createdAt: string;
}

export default function MenuDetailInfo({
    korName,
    engName,
    description,
    price,
    categoryName,
    isAvailable,
    createdAt,
}: MenuDetailInfoProps) {
    const formatDate = (dateString: string) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className={styles.infoSection}>
            {/* Status & Category Badges */}
            <div className={styles.statusBadges}>
                {isAvailable ? (
                    <span className={`${styles.badge} ${styles.available}`}>
                        <CheckCircle size={14} />
                        판매중
                    </span>
                ) : (
                    <span className={`${styles.badge} ${styles.soldOut}`}>
                        <XCircle size={14} />
                        판매중지
                    </span>
                )}
                <span className={`${styles.badge} ${styles.category}`}>
                    <Tag size={14} />
                    {categoryName}
                </span>
            </div>

            {/* Name */}
            <h2 className={styles.title}>{korName}</h2>
            <p className={styles.engName}>{engName}</p>

            {/* Price */}
            <p className={styles.price}>{price.toLocaleString()}원</p>

            {/* Description */}
            <div className={styles.descriptionSection}>
                <h3 className={styles.sectionTitle}>설명</h3>
                <p className={styles.description}>
                    {description || '설명이 없습니다.'}
                </p>
            </div>

            {/* Category Info */}
            <div className={styles.categorySection}>
                <h3 className={styles.sectionTitle}>카테고리 정보</h3>
                <div className={styles.categoryInfo}>
                    <span className={styles.categoryLabel}>카테고리</span>
                    <span className={styles.categoryValue}>{categoryName}</span>
                </div>
            </div>

            {/* Meta Info */}
            <div className={styles.metaSection}>
                <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>등록일</span>
                    <span className={styles.metaValue}>{formatDate(createdAt)}</span>
                </div>
            </div>
        </div>
    );
}
