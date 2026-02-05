import Link from 'next/link';
import SearchForm from '../SearchForm/SearchForm';
import styles from './Header.module.css';

interface HeaderProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
    return (
        <header className={styles.header}>
            <div className={styles.topSection}>
                <h1 className={styles.title}>메뉴 관리</h1>
                <nav className={styles.nav}>
                    <Link href="/admin/menus/new" className={styles.addButton}>
                        신규 메뉴 등록
                    </Link>
                </nav>
            </div>
            <div className={styles.searchSection}>
                <SearchForm searchQuery={searchQuery} onSearchChange={onSearchChange} />
            </div>
        </header>
    );
}
