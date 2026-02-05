"use client";

import { useState, useEffect } from 'react';
import MenuListItem from './MenuListItem';
import styles from './MenuList.module.css';
import { useMenus } from './useMenus';
import Pagination from './Pagination';


interface MenuListProps {
    selectedCategory: string | null;
    searchQuery: string | undefined;
}

export default function MenuList({ selectedCategory, searchQuery }: MenuListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const { menus, total } = useMenus(selectedCategory, searchQuery);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(total / itemsPerPage);

    // 필터 변경 시 페이지 초기화
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchQuery]);

    return (
        <div className={styles.container}>
            {menus.length === 0 ? (
                <div className={styles.centerMessage}>
                    등록된 메뉴가 없습니다.
                </div>
            ) : (
                <>
                    <div className={styles.grid}>
                        {menus.map((menu) => (
                            <MenuListItem key={menu.id} menu={menu} />
                        ))}
                    </div>

                    {/* 페이징 컨트롤 */}
                    <div className={styles.paginationWrapper}>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
