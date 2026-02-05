'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2, Image as ImageIcon, X } from 'lucide-react';
import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import TextArea from '@/components/common/TextArea/TextArea';
import Select from '@/components/common/Select/Select';
import { Menu, MenuCategory } from '@/types/menu';
import styles from './MenuForm.module.css';

interface MenuFormProps {
    initialData?: Menu;
    onSubmit: (data: any) => void;
    isLoading?: boolean;
}

const CATEGORY_OPTIONS = [
    { value: 'COFFEE', label: '커피' },
    { value: 'BEVERAGE', label: '음료' },
    { value: 'DESSERT', label: '디저트' },
    { value: 'BAKERY', label: '베이커리' },
    { value: 'OTHER', label: '기타' },
];

const MenuForm = ({ initialData, onSubmit, isLoading = false }: MenuFormProps) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: initialData || {
            korName: '',
            engName: '',
            description: '',
            price: 0,
            category: 'COFFEE',
            isAvailable: true,
            isSoldOut: false,
            options: [],
        },
    });

    const { fields: optionFields, append: appendOption, remove: removeOption } = useFieldArray({
        control,
        name: 'options',
    });

    const [images, setImages] = useState(initialData?.images || []);

    const handleImageUpload = () => {
        // In a real app, this would open a file picker and upload to storage
        const newImage = {
            id: Math.random().toString(36).substr(2, 9),
            url: 'https://images.unsplash.com/photo-1541167760496-162955ed2a95?q=80&w=400&auto=format&fit=crop', // Mock URL
            isPrimary: images.length === 0,
            sortOrder: images.length + 1,
        };
        setImages([...images, newImage]);
    };

    const removeImage = (id: string) => {
        setImages(images.filter((img) => img.id !== id));
    };

    const setPrimaryImage = (id: string) => {
        setImages(
            images.map((img) => ({
                ...img,
                isPrimary: img.id === id,
            }))
        );
    };

    const onFormSubmit = (data: any) => {
        onSubmit({ ...data, images });
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
            <div className={styles.grid}>
                {/* Left column: Basic Info */}
                <div className={styles.column}>
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>기본 정보</h3>
                        <div className={styles.sectionContent}>
                            <Input
                                label="메뉴명 (한글)"
                                placeholder="예: 아메리카노"
                                error={errors.korName?.message as string}
                                {...register('korName', { required: '한글 메뉴명은 필수입니다' })}
                            />
                            <Input
                                label="메뉴명 (영문)"
                                placeholder="예: Americano"
                                error={errors.engName?.message as string}
                                {...register('engName', { required: '영문 메뉴명은 필수입니다' })}
                            />
                            <div className={styles.row}>
                                <Input
                                    label="가격"
                                    type="number"
                                    placeholder="0"
                                    error={errors.price?.message as string}
                                    {...register('price', {
                                        required: '가격은 필수입니다',
                                        valueAsNumber: true,
                                        min: { value: 0, message: '가격은 0원 이상이어야 합니다' },
                                    })}
                                />
                                <Select
                                    label="카테고리"
                                    options={CATEGORY_OPTIONS}
                                    error={errors.category?.message as string}
                                    {...register('category', { required: '카테고리는 필수입니다' })}
                                />
                            </div>
                            <TextArea
                                label="설명"
                                placeholder="메뉴에 대한 설명을 입력하세요"
                                error={errors.description?.message as string}
                                {...register('description')}
                            />
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>이미지</h3>
                        <div className={styles.imageGrid}>
                            {images.map((img) => (
                                <div key={img.id} className={`${styles.imageWrapper} ${img.isPrimary ? styles.primary : ''}`}>
                                    <img src={img.url} alt="Menu" className={styles.image} />
                                    <button
                                        type="button"
                                        className={styles.removeImageBtn}
                                        onClick={() => removeImage(img.id)}
                                    >
                                        <X size={14} />
                                    </button>
                                    <button
                                        type="button"
                                        className={styles.primaryBadge}
                                        onClick={() => setPrimaryImage(img.id)}
                                    >
                                        {img.isPrimary ? '대표' : '대표 설정'}
                                    </button>
                                </div>
                            ))}
                            <button type="button" className={styles.uploadBtn} onClick={handleImageUpload}>
                                <ImageIcon size={24} />
                                <span>추가</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right column: Options & Status */}
                <div className={styles.column}>
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h3 className={styles.sectionTitle}>옵션 관리</h3>
                            <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                onClick={() =>
                                    appendOption({
                                        id: Math.random().toString(36).substr(2, 9),
                                        name: '',
                                        type: 'radio',
                                        required: true,
                                        items: [],
                                    })
                                }
                            >
                                <Plus size={16} />
                                옵션 그룹 추가
                            </Button>
                        </div>

                        <div className={styles.optionGroups}>
                            {optionFields.map((field, index) => (
                                <div key={field.id} className={styles.optionGroup}>
                                    <div className={styles.optionGroupHeader}>
                                        <Input
                                            placeholder="옵션 그룹명 (예: 사이즈, 샷 추가)"
                                            {...register(`options.${index}.name` as const, { required: true })}
                                            className={styles.optionNameInput}
                                        />
                                        <button
                                            type="button"
                                            className={styles.deleteOptionBtn}
                                            onClick={() => removeOption(index)}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <div className={styles.optionGroupBody}>
                                        <div className={styles.optionSettings}>
                                            <label className={styles.checkboxLabel}>
                                                <input type="checkbox" {...register(`options.${index}.required` as const)} />
                                                <span>필수 선택</span>
                                            </label>
                                            <Select
                                                options={[
                                                    { value: 'radio', label: '단일 선택' },
                                                    { value: 'checkbox', label: '다중 선택' },
                                                ]}
                                                {...register(`options.${index}.type` as const)}
                                                className={styles.typeSelect}
                                            />
                                        </div>
                                        {/* In a fuller implementation, you'd have nested field arrays for items */}
                                        <p className={styles.hint}>* 상세 옵션 아이템은 등록 후 수정 가능합니다.</p>
                                    </div>
                                </div>
                            ))}
                            {optionFields.length === 0 && <p className={styles.emptyText}>추가된 옵션이 없습니다.</p>}
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>판매 상태</h3>
                        <div className={styles.statusGrid}>
                            <label className={styles.statusCard}>
                                <input type="radio" value="available" {...register('status' as any)} defaultChecked />
                                <div className={styles.statusInfo}>
                                    <span className={styles.statusLabel}>판매 중</span>
                                    <span className={styles.statusDesc}>고객에게 메뉴가 노출됩니다</span>
                                </div>
                            </label>
                            <label className={styles.statusCard}>
                                <input type="checkbox" {...register('isSoldOut')} />
                                <div className={styles.statusInfo}>
                                    <span className={styles.statusLabel}>품절</span>
                                    <span className={styles.statusDesc}>메뉴가 노출되지만 주문 불가</span>
                                </div>
                            </label>
                            <label className={styles.statusCard}>
                                <input type="checkbox" {...register('isHidden' as any)} />
                                <div className={styles.statusInfo}>
                                    <span className={styles.statusLabel}>숨김</span>
                                    <span className={styles.statusDesc}>고객에게 메뉴가 보이지 않습니다</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.footer}>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.history.back()}
                    disabled={isLoading}
                >
                    취소
                </Button>
                <Button type="submit" isLoading={isLoading}>
                    {initialData ? '수정 완료' : '메뉴 등록'}
                </Button>
            </div>
        </form>
    );
};

export default MenuForm;
