'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Edit2, Trash2 } from 'lucide-react';
import Button from '@/components/common/Button/Button';
import styles from './MenuDetailHeader.module.css';

interface MenuDetailHeaderProps {
    menuId: number;
    menuName: string;
    onDelete: () => void;
}

export default function MenuDetailHeader({ menuId, menuName, onDelete }: MenuDetailHeaderProps) {
    return (
        <div className={styles.header}>
            <div className={styles.headerLeft}>
                <Link href="/admin/menus" className={styles.backLink}>
                    <ArrowLeft size={20} />
                    <span>메뉴 목록</span>
                </Link>
                <h1 className={styles.pageTitle}>{menuName}</h1>
            </div>
            <div className={styles.actions}>
                <Link href={`/admin/menus/${menuId}/edit`}>
                    <Button variant="outline">
                        <Edit2 size={18} />
                        <span>수정</span>
                    </Button>
                </Link>
                <Button variant="danger" onClick={onDelete}>
                    <Trash2 size={18} />
                    <span>삭제</span>
                </Button>
            </div>
        </div>
    );
}
