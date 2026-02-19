import React from 'react';
import LoginCard from './_components/LoginCard/LoginCard';
import styles from './LoginPage.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Login | N Cafe',
    description: 'N Cafe 관리자 로그인 페이지입니다.',
};

export default function LoginPage() {
    return (
        <div className={styles.pageContainer}>
            {/* 배경 장식 */}
            <div className={styles.backgroundDecoration} />
            <div className={styles.backgroundDecorationBottom} />

            <div className={styles.contentWrapper}>
                <LoginCard />
            </div>
        </div>
    );
}
