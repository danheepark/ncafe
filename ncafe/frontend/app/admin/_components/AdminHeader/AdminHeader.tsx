import React from 'react';
import { Bell, User } from 'lucide-react';
import styles from './AdminHeader.module.css';

const AdminHeader = () => {
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <h2>관리자 센터</h2>
            </div>
            <div className={styles.right}>
                <button className={styles.iconBtn}>
                    <Bell size={20} />
                    <span className={styles.badge}></span>
                </button>
                <div className={styles.profile}>
                    <div className={styles.avatar}>
                        <User size={20} />
                    </div>
                    <span className={styles.username}>사장님</span>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
