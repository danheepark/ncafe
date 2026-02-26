import React from 'react';
import LoginCard from './_components/LoginCard/LoginCard';
import styles from './LoginPage.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login | N.CAFE',
    description: 'N.CAFE 로그인 페이지입니다. 카페 손님 또는 관리자로 로그인하세요.',
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

