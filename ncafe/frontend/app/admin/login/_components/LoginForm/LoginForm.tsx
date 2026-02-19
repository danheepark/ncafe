'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../../_lib/authApi';
import styles from './LoginForm.module.css';

export default function LoginForm() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!username.trim()) newErrors.username = '아이디를 입력해주세요.';
        if (!password.trim()) newErrors.password = '비밀번호를 입력해주세요.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');

        if (!validate()) return;

        setIsLoading(true);
        try {
            await authApi.login({ username, password });
            router.push('/admin');
        } catch (err) {
            setErrorMessage(err instanceof Error ? err.message : '로그인에 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {errorMessage && (
                <div className={styles.errorBanner} role="alert">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 3a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4zm0 7.5a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75z" />
                    </svg>
                    {errorMessage}
                </div>
            )}

            {/* 아이디 */}
            <div className={styles.fieldGroup}>
                <label htmlFor="login-username" className={styles.label}>
                    아이디
                </label>
                <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </span>
                    <input
                        id="login-username"
                        type="text"
                        className={styles.input}
                        placeholder="아이디를 입력하세요"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                        autoFocus
                    />
                </div>
                {errors.username && <span className={styles.errorText}>{errors.username}</span>}
            </div>

            {/* 비밀번호 */}
            <div className={styles.fieldGroup}>
                <label htmlFor="login-password" className={styles.label}>
                    비밀번호
                </label>
                <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                    </span>
                    <input
                        id="login-password"
                        type="password"
                        className={styles.input}
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                </div>
                {errors.password && <span className={styles.errorText}>{errors.password}</span>}
            </div>

            <button
                id="login-submit-btn"
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
            >
                {isLoading ? '로그인 중...' : '로그인'}
            </button>
        </form>
    );
}
