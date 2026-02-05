"use client";

import styles from './MenuListItem.module.css';
import { MenuResponse } from './useMenus';

interface MenuListItemProps {
    menu: MenuResponse;
}

export default function MenuListItem({ menu }: MenuListItemProps) {
    return (
        <div className={styles.card}>
            <div
                className={styles.imagePlaceholder}
                style={menu.imageSrc ? {
                    backgroundImage: `url(http://localhost:8080/${menu.imageSrc})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                } : {}}
            />
            <div className={styles.content}>
                <div className={styles.header}>
                    <h3 className={styles.name}>{menu.korName}</h3>
                    <span className={styles.price}>{Number(menu.price).toLocaleString()}원</span>
                </div>
                <p className={styles.description}>{menu.description || '설명 없음'}</p>
                <div className={styles.actions}>
                    <button className={styles.editButton}>수정</button>
                    <button className={styles.deleteButton}>삭제</button>
                </div>
            </div>
        </div>
    );
}
