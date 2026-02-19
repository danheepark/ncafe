'use client';

import Link from 'next/link';
import { Coffee, ShoppingBag, TrendingUp, ArrowRight } from 'lucide-react';
import styles from './DashboardPage.module.css';

const stats = [
    {
        label: '등록된 메뉴',
        value: '-',
        icon: Coffee,
        href: '/admin/menus',
    },
    {
        label: '오늘 주문',
        value: '-',
        icon: ShoppingBag,
        href: '/admin/orders',
    },
    {
        label: '이번 달 매출',
        value: '-',
        icon: TrendingUp,
        href: '/admin/orders',
    },
];

const quickLinks = [
    { label: '메뉴 추가하기', href: '/admin/menus/new' },
    { label: '메뉴 목록 보기', href: '/admin/menus' },
];

export default function DashboardPage() {
    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>대시보드</h1>
                <p className={styles.subtitle}>카페 운영 현황을 한눈에 확인하세요.</p>
            </div>

            <div className={styles.statsGrid}>
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Link key={stat.label} href={stat.href} className={styles.statCard}>
                            <div className={styles.statIcon}>
                                <Icon size={22} />
                            </div>
                            <div className={styles.statBody}>
                                <span className={styles.statValue}>{stat.value}</span>
                                <span className={styles.statLabel}>{stat.label}</span>
                            </div>
                            <ArrowRight size={16} className={styles.statArrow} />
                        </Link>
                    );
                })}
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>빠른 이동</h2>
                <div className={styles.quickLinks}>
                    {quickLinks.map((link) => (
                        <Link key={link.href} href={link.href} className={styles.quickLink}>
                            {link.label}
                            <ArrowRight size={14} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
