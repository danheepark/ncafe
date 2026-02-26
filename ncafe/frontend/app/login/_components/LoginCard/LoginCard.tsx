'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import LoginForm from '../LoginForm/LoginForm';
import styles from './LoginCard.module.css';

function LoginCardContent() {
    const searchParams = useSearchParams();
    const [loginType, setLoginType] = useState<'customer' | 'admin'>('customer');

    useEffect(() => {
        const type = searchParams.get('type');
        if (type === 'admin' || type === 'customer') {
            setLoginType(type);
        }
    }, [searchParams]);

    return (
        <div className={styles.card}>
            {/* 로고 영역 */}
            <Link href="/" className={styles.logoLink}>
                <div className={styles.logoArea}>
                    <div className={styles.logoIcon}>
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                            <line x1="6" y1="1" x2="6" y2="4" />
                            <line x1="10" y1="1" x2="10" y2="4" />
                            <line x1="14" y1="1" x2="14" y2="4" />
                        </svg>
                    </div>
                    <span className={styles.brandName}>N Cafe</span>
                    <span className={styles.brandSub}>
                        {loginType === 'admin' ? 'Admin Console' : 'Premium Guest Space'}
                    </span>
                </div>
            </Link>

            <h1 className={styles.title}>
                {loginType === 'admin' ? '관리자 로그인' : '카페 손님 로그인'}
            </h1>
            <p className={styles.subtitle}>
                {loginType === 'admin'
                    ? '관리 계정으로 계속하려면 정보를 입력하세요'
                    : 'N.CAFE의 특별한 공간과 혜택을 만나보세요'}
            </p>
            <div className={styles.divider} />

            <LoginForm loginType={loginType} />

            <div className={styles.switchModeArea}>
                <button
                    className={styles.switchButton}
                    onClick={() => setLoginType(loginType === 'admin' ? 'customer' : 'admin')}
                >
                    {loginType === 'admin' ? '카페 손님으로 로그인하기' : '관리자 계정으로 로그인하기'}
                </button>
            </div>
        </div>
    );
}

export default function LoginCard() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginCardContent />
        </Suspense>
    );
}
