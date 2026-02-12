'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MoreVertical, Edit2, Trash2, Power } from 'lucide-react';
import { MenuResponse } from '../MenuList/useMenus';
import styles from './MenuCard.module.css';

interface MenuCardProps {
    menu: MenuResponse;
    onToggleSoldOut: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const MenuCard = ({ menu, onToggleSoldOut, onEdit, onDelete }: MenuCardProps) => {
    const imageUrl = menu.imageSrc;
    console.log("Image URL:", imageUrl);

    return (
        <div className={`${styles.card} ${menu.isAvailable ? '' : styles.soldOut}`}>
            <Link href={`/admin/menus/${menu.id}`} className={styles.cardLink}>
                <div className={styles.imageContainer}>
                    {imageUrl ? (
                        <Image
                            src={`/images/${menu.imageSrc}`}
                            alt={menu.korName}
                            fill
                            className={styles.image}
                            onLoad={() => console.log(`Image loaded: ${menu.imageSrc}`)}
                            onError={() => console.error(`Image failed to load: ${menu.imageSrc}`)}
                        />
                    ) : (
                        <div className={styles.placeholder}>이미지 없음</div>
                    )}
                    {menu.isAvailable && <div className={styles.badgeSoldOut}>품절</div>}
                </div>

                <div className={styles.content}>
                    <div className={styles.header}>
                        <div>
                            <h3 className={styles.title}>{menu.korName}</h3>
                            <p className={styles.subtitle}>{menu.engName}</p>
                        </div>
                    </div>
                    <p className={styles.price}>{menu.price.toLocaleString()}원</p>
                </div>
            </Link>

            <div className={styles.actions}>
                <button
                    type="button"
                    className={`${styles.actionBtn} ${menu.isAvailable ? styles.btnSoldOut : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onToggleSoldOut(menu.id);
                    }}
                    title={menu.isAvailable ? "판매 개시" : "품절 처리"}
                >
                    <Power size={16} />
                    <span>{menu.isAvailable ? '판매중으로' : '품절로'}</span>
                </button>
                <Link
                    href={`/admin/menus/${menu.id}/edit`}
                    className={styles.actionBtn}
                    onClick={(e) => e.stopPropagation()}
                    title="수정"
                >
                    <Edit2 size={16} />
                </Link>
                <button
                    type="button"
                    className={`${styles.actionBtn} ${styles.btnDelete}`}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Delete button clicked for:', menu.id);
                        onDelete(menu.id);
                    }}
                    title="삭제"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};

export default MenuCard;

