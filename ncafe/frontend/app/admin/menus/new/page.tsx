'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import MenuForm from '../_components/MenuForm/MenuForm';
import styles from './NewMenuPage.module.css';

export default function NewMenuPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (data: any) => {
        setIsSubmitting(true);
        // Simulate API call
        console.log('Registering menu:', data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSubmitting(false);

        // Redirect back to menu list
        router.push('/admin/menus');
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/admin/menus" className={styles.backLink}>
                    <ArrowLeft size={20} />
                    <span>목록으로</span>
                </Link>
                <h1 className={styles.title}>새 메뉴 등록</h1>
            </header>

            <div className={styles.content}>
                <MenuForm onSubmit={handleSubmit} isLoading={isSubmitting} />
            </div>
        </div>
    );
}
