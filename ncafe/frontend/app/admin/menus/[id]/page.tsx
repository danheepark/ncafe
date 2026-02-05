'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Edit2, Trash2, Package, CheckCircle, XCircle } from 'lucide-react';
import Button from '@/components/common/Button/Button';
import { MOCK_MENUS } from '@/mocks/menuData';
import { Menu } from '@/types/menu';
import styles from './MenuDetailPage.module.css';

export default function MenuDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [menu, setMenu] = useState<Menu | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call with mock data
        const foundMenu = MOCK_MENUS.find((m) => m.id === params.id);
        setMenu(foundMenu || null);
        setLoading(false);
    }, [params.id]);

    const handleDelete = () => {
        if (confirm('정말로 이 메뉴를 삭제하시겠습니까?')) {
            // In real app, call delete API
            router.push('/admin/menus');
        }
    };

    if (loading) {
        return (
            <div className={styles.loading}>
                <p>로딩 중...</p>
            </div>
        );
    }

    if (!menu) {
        return (
            <div className={styles.notFound}>
                <h2>메뉴를 찾을 수 없습니다</h2>
                <Link href="/admin/menus">
                    <Button variant="outline">목록으로 돌아가기</Button>
                </Link>
            </div>
        );
    }

    const primaryImage = menu.images.find((img) => img.isPrimary) || menu.images[0];

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <Link href="/admin/menus" className={styles.backLink}>
                    <ArrowLeft size={20} />
                    <span>메뉴 목록</span>
                </Link>
                <div className={styles.actions}>
                    <Link href={`/admin/menus/${menu.id}/edit`}>
                        <Button variant="outline">
                            <Edit2 size={18} />
                            <span>수정</span>
                        </Button>
                    </Link>
                    <Button variant="danger" onClick={handleDelete}>
                        <Trash2 size={18} />
                        <span>삭제</span>
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className={styles.content}>
                {/* Image Section */}
                <div className={styles.imageSection}>
                    <div className={styles.mainImage}>
                        {primaryImage ? (
                            <Image
                                src={primaryImage.url}
                                alt={menu.korName}
                                fill
                                className={styles.image}
                                unoptimized
                            />
                        ) : (
                            <div className={styles.noImage}>
                                <Package size={48} />
                                <span>이미지 없음</span>
                            </div>
                        )}
                    </div>
                    {menu.images.length > 1 && (
                        <div className={styles.thumbnails}>
                            {menu.images.map((img) => (
                                <div
                                    key={img.id}
                                    className={`${styles.thumbnail} ${img.isPrimary ? styles.active : ''}`}
                                >
                                    <Image
                                        src={img.url}
                                        alt=""
                                        fill
                                        className={styles.thumbImage}
                                        unoptimized
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info Section */}
                <div className={styles.infoSection}>
                    {/* Status Badge */}
                    <div className={styles.statusBadges}>
                        {menu.isSoldOut ? (
                            <span className={`${styles.badge} ${styles.soldOut}`}>
                                <XCircle size={14} />
                                품절
                            </span>
                        ) : menu.isAvailable ? (
                            <span className={`${styles.badge} ${styles.available}`}>
                                <CheckCircle size={14} />
                                판매중
                            </span>
                        ) : (
                            <span className={`${styles.badge} ${styles.hidden}`}>
                                숨김
                            </span>
                        )}
                    </div>

                    {/* Name */}
                    <h1 className={styles.title}>{menu.korName}</h1>
                    <p className={styles.engName}>{menu.engName}</p>

                    {/* Price */}
                    <p className={styles.price}>{menu.price.toLocaleString()}원</p>

                    {/* Description */}
                    <div className={styles.descriptionSection}>
                        <h3 className={styles.sectionTitle}>설명</h3>
                        <p className={styles.description}>
                            {menu.description || '설명이 없습니다.'}
                        </p>
                    </div>

                    {/* Options */}
                    {menu.options.length > 0 && (
                        <div className={styles.optionsSection}>
                            <h3 className={styles.sectionTitle}>옵션</h3>
                            <div className={styles.optionsList}>
                                {menu.options.map((option) => (
                                    <div key={option.id} className={styles.optionGroup}>
                                        <div className={styles.optionHeader}>
                                            <span className={styles.optionName}>{option.name}</span>
                                            <span className={styles.optionType}>
                                                {option.type === 'radio' ? '단일 선택' : '다중 선택'}
                                                {option.required && ' (필수)'}
                                            </span>
                                        </div>
                                        <div className={styles.optionItems}>
                                            {option.items.map((item) => (
                                                <div key={item.id} className={styles.optionItem}>
                                                    <span>{item.name}</span>
                                                    {item.priceDelta > 0 && (
                                                        <span className={styles.priceDelta}>
                                                            +{item.priceDelta.toLocaleString()}원
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Meta Info */}
                    <div className={styles.metaSection}>
                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>등록일</span>
                            <span className={styles.metaValue}>
                                {new Date(menu.createdAt).toLocaleDateString('ko-KR')}
                            </span>
                        </div>
                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>수정일</span>
                            <span className={styles.metaValue}>
                                {new Date(menu.updatedAt).toLocaleDateString('ko-KR')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
