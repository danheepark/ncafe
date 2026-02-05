import React from 'react';
import AdminSidebar from './_components/AdminSidebar/AdminSidebar';
import AdminHeader from './_components/AdminHeader/AdminHeader';
import styles from './AdminLayout.module.css';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.container}>
            <AdminSidebar />
            <div className={styles.mainContent}>
                <AdminHeader />
                <main className={styles.content}>
                    {children}
                </main>
            </div>
        </div>
    );
}
