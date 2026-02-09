'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, GripVertical } from 'lucide-react';
import Button from '@/components/common/Button/Button';
import styles from './MenuDetailOptions.module.css';

// 더미 데이터 타입
interface OptionItem {
    id: string;
    name: string;
    priceDelta: number;
}

interface MenuOption {
    id: string;
    name: string;
    type: 'radio' | 'checkbox';
    required: boolean;
    items: OptionItem[];
}

// 더미 데이터
const DUMMY_OPTIONS: MenuOption[] = [
    {
        id: 'opt-1',
        name: '사이즈',
        type: 'radio',
        required: true,
        items: [
            { id: 'item-1', name: 'Regular', priceDelta: 0 },
            { id: 'item-2', name: 'Large', priceDelta: 500 },
            { id: 'item-3', name: 'Venti', priceDelta: 1000 },
        ],
    },
    {
        id: 'opt-2',
        name: '온도',
        type: 'radio',
        required: true,
        items: [
            { id: 'item-4', name: 'Hot', priceDelta: 0 },
            { id: 'item-5', name: 'Ice', priceDelta: 0 },
        ],
    },
    {
        id: 'opt-3',
        name: '추가 옵션',
        type: 'checkbox',
        required: false,
        items: [
            { id: 'item-6', name: '샷 추가', priceDelta: 500 },
            { id: 'item-7', name: '시럽 추가', priceDelta: 300 },
            { id: 'item-8', name: '휘핑크림', priceDelta: 500 },
            { id: 'item-9', name: '카라멜 드리즐', priceDelta: 300 },
        ],
    },
];

interface MenuDetailOptionsProps {
    menuId: number;
}

export default function MenuDetailOptions({ menuId }: MenuDetailOptionsProps) {
    const [options, setOptions] = useState<MenuOption[]>(DUMMY_OPTIONS);

    const handleAddOption = () => {
        // TODO: 옵션 추가 모달 구현
        alert('옵션 추가 기능이 추가될 예정입니다.');
    };

    const handleEditOption = (optionId: string) => {
        // TODO: 옵션 수정 모달 구현
        alert(`옵션 수정 기능이 추가될 예정입니다. (ID: ${optionId})`);
    };

    const handleDeleteOption = (optionId: string) => {
        if (confirm('이 옵션을 삭제하시겠습니까?')) {
            setOptions(options.filter((opt) => opt.id !== optionId));
        }
    };

    return (
        <div className={styles.optionsSection}>
            <div className={styles.optionsSectionHeader}>
                <h3 className={styles.sectionTitle}>옵션 관리</h3>
                <Button variant="outline" onClick={handleAddOption}>
                    <Plus size={16} />
                    <span>옵션 추가</span>
                </Button>
            </div>

            {options.length > 0 ? (
                <div className={styles.optionsList}>
                    {options.map((option) => (
                        <div key={option.id} className={styles.optionGroup}>
                            <div className={styles.optionHeader}>
                                <div className={styles.optionDragHandle}>
                                    <GripVertical size={16} />
                                </div>
                                <div className={styles.optionInfo}>
                                    <span className={styles.optionName}>{option.name}</span>
                                    <div className={styles.optionMeta}>
                                        <span className={styles.optionType}>
                                            {option.type === 'radio' ? '단일 선택' : '다중 선택'}
                                        </span>
                                        {option.required && (
                                            <span className={styles.optionRequired}>필수</span>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.optionActions}>
                                    <button
                                        className={styles.optionAction}
                                        onClick={() => handleEditOption(option.id)}
                                        title="수정"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        className={`${styles.optionAction} ${styles.deleteAction}`}
                                        onClick={() => handleDeleteOption(option.id)}
                                        title="삭제"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className={styles.optionItems}>
                                {option.items.map((item) => (
                                    <div key={item.id} className={styles.optionItem}>
                                        <span className={styles.optionItemName}>{item.name}</span>
                                        {item.priceDelta > 0 && (
                                            <span className={styles.priceDelta}>
                                                +{item.priceDelta.toLocaleString()}원
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.noOptions}>
                    <p>등록된 옵션이 없습니다.</p>
                    <p className={styles.noOptionsHint}>옵션을 추가하여 메뉴의 사이즈, 온도 등을 설정하세요.</p>
                </div>
            )}
        </div>
    );
}
