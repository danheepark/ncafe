import { useState, useEffect } from 'react';
import Link from "next/link";
import { authAPI } from '@/app/lib/api';
import styles from "./Header.module.css";

interface HeaderProps {
    transparent?: boolean;
    hideLogo?: boolean;
}

export default function Header({
    transparent = false,
    hideLogo = false
}: HeaderProps) {
    const [user, setUser] = useState<any>(null);

    const checkLoginStatus = async () => {
        try {
            const data = await authAPI.getSession();
            setUser(data?.user || null);
        } catch {
            setUser(null);
        }
    };

    useEffect(() => {
        checkLoginStatus();

        // 다른 컴포넌트에서 login/logout 이벤트 발생 시 갱신
        const onLogin = () => checkLoginStatus();
        const onLogout = () => setUser(null);

        window.addEventListener('login', onLogin);
        window.addEventListener('logout', onLogout);

        return () => {
            window.removeEventListener('login', onLogin);
            window.removeEventListener('logout', onLogout);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await authAPI.logout();
            setUser(null);
            window.dispatchEvent(new Event('logout'));
            window.location.href = '/'; // 로그아웃 후 홈으로
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <header className={`${styles.header} ${transparent ? styles.transparent : ""}`}>
            <div className={styles.container}>
                {!hideLogo ? (
                    <Link href="/" className={styles.logo}>
                        <div className={styles.logoIcon}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                                <line x1="6" y1="1" x2="6" y2="4" />
                                <line x1="10" y1="1" x2="10" y2="4" />
                                <line x1="14" y1="1" x2="14" y2="4" />
                            </svg>
                        </div>
                        <span className={styles.brandName}>N.CAFE</span>
                    </Link>
                ) : (
                    <div />
                )}
                <nav className={styles.nav}>
                    {user ? (
                        <div className={styles.userInfo}>
                            <span className={styles.userName}>{user.username}님</span>
                            {user.role === 'ADMIN' && (
                                <Link href="/admin" className={styles.adminLink}>
                                    관리도구
                                </Link>
                            )}
                            <button onClick={handleLogout} className={styles.logoutButton}>
                                로그아웃
                            </button>
                        </div>
                    ) : (
                        <Link href="/login?type=admin" className={styles.adminButton}>
                            내사장이오
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}

