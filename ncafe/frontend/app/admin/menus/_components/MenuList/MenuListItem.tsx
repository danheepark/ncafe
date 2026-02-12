"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './MenuListItem.module.css';
import { MenuResponse } from './useMenus';

interface MenuListItemProps {
    menu: MenuResponse;
}

export default function MenuListItem({ menu }: MenuListItemProps) {
    const router = useRouter();

    const handleEdit = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/admin/menus/${menu.id}/edit`);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (confirm('정말로 이 메뉴를 삭제하시겠습니까?')) {
            // TODO: 삭제 API 호출
            alert('삭제 기능이 구현될 예정입니다.');
        }
    };

    return (
        <Link href={`/admin/menus/${menu.id}`} className={styles.cardLink}>
            <div className={styles.card}>
                <div
                    className={styles.imagePlaceholder}
                    style={menu.imageSrc ? {
                        backgroundImage: `url(/images/${menu.imageSrc})`,
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
                        <button className={styles.editButton} onClick={handleEdit}>수정</button>
                        <button className={styles.deleteButton} onClick={handleDelete}>삭제</button>
                    </div>
                </div>
            </div>
        </Link>
    );
}

