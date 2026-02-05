'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Coffee, ShoppingBag, Settings, LogOut } from 'lucide-react';
import styles from './AdminSidebar.module.css';

const navItems = [
    { name: '대시보드', href: '/admin', icon: LayoutDashboard },
    { name: '메뉴 관리', href: '/admin/menus', icon: Coffee },
    { name: '주문 내역', href: '/admin/orders', icon: ShoppingBag },
    { name: '설정', href: '/admin/settings', icon: Settings },
];

const AdminSidebar = () => {
    const pathname = usePathname();

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <h1>NCafe Admin</h1>
            </div>
            <nav className={styles.nav}>
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                        >
                            <Icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
            <div className={styles.footer}>
                <button className={styles.logoutBtn}>
                    <LogOut size={20} />
                    <span>로그아웃</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
