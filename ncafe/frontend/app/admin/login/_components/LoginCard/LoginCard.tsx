import LoginForm from '../LoginForm/LoginForm';
import styles from './LoginCard.module.css';

export default function LoginCard() {
    return (
        <div className={styles.card}>
            {/* 로고 영역 */}
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
                <span className={styles.brandSub}>Admin Console</span>
            </div>

            <h1 className={styles.title}>관리자 로그인</h1>
            <p className={styles.subtitle}>계속하려면 자격 증명을 입력하세요</p>
            <div className={styles.divider} />

            <LoginForm />
        </div>
    );
}
