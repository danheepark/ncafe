'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import MenuForm from '../../_components/MenuForm/MenuForm';
import { MOCK_MENUS } from '@/mocks/menuData';
import { Menu } from '@/types/menu';
import styles from './EditMenuPage.module.css';

export default function EditMenuPage() {
    const router = useRouter();
    const params = useParams();
    const [initialData, setInitialData] = useState<Menu | undefined>(undefined);
    const [isFetching, setIsFetching] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Simulate fetching data
        const fetchMenu = async () => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const menu = MOCK_MENUS.find((m) => m.id === params.id);
            setInitialData(menu);
            setIsFetching(false);
        };
        fetchMenu();
    }, [params.id]);

    const handleSubmit = async (data: any) => {
        setIsSubmitting(true);
        // Simulate API call
        console.log('Updating menu:', params.id, data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSubmitting(false);

        // Redirect to detail page
        router.push(`/admin/menus/${params.id}`);
    };

    if (isFetching) {
        return (
            <div className={styles.loadingContainer}>
                <span className={styles.loader}></span>
                <p>메뉴 정보를 불어오는 중...</p>
            </div>
        );
    }

    if (!initialData) {
        return (
            <div className={styles.errorContainer}>
                <h2>메뉴를 찾을 수 없습니다</h2>
                <Link href="/admin/menus">
                    <Button variant="outline">목록으로 돌아가기</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href={`/admin/menus/${params.id}`} className={styles.backLink}>
                    <ArrowLeft size={20} />
                    <span>상세로</span>
                </Link>
                <h1 className={styles.title}>메뉴 수정</h1>
            </header>

            <div className={styles.content}>
                <MenuForm
                    initialData={initialData}
                    onSubmit={handleSubmit}
                    isLoading={isSubmitting}
                />
            </div>
        </div>
    );
}

// Add a simple Button mock since I can't import correctly if not exported as default or similar
const Button = ({ children, variant, onClick }: any) => (
    <button
        onClick={onClick}
        className={`${styles.btn} ${variant === 'outline' ? styles.btnOutline : ''}`}
    >
        {children}
    </button>
);
