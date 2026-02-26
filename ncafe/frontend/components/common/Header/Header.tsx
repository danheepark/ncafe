"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

interface HeaderProps {
    transparent?: boolean;
    hideLogo?: boolean;
}

export default function Header({
    transparent: initialTransparent = false,
    hideLogo = false
}: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        if (!initialTransparent) return;

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [initialTransparent]);

    const isTransparent = initialTransparent && !isScrolled;

    return (
        <header className={`${styles.header} ${isTransparent ? styles.transparent : ""}`}>
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
                    <Link href="/login?type=admin" className={styles.adminButton}>
                        내사장이오
                    </Link>
                </nav>
            </div>
        </header>
    );
}
