"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Plus, Minus, CheckCircle2, ShoppingCart } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import styles from "../../MenuDetailPage.module.css";
import { useCart, CartItemOption } from "../../_context/CartContext";

interface Menu {
    id: number;
    korName: string;
    engName: string;
    description: string;
    price: number;
    images: { srcUrl: string }[];
}

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

const MENU_OPTIONS: MenuOption[] = [
    {
        id: 'opt-1',
        name: '사이즈',
        type: 'radio',
        required: true,
        items: [
            { id: 'item-1', name: 'Regular', priceDelta: 0 },
            { id: 'item-2', name: 'Large', priceDelta: 500 },
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
        ],
    },
];

export default function MenuDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { addToCart } = useCart();

    const [menu, setMenu] = useState<Menu | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({
        'opt-1': ['item-1'], // Default Regular
        'opt-2': ['item-4'], // Default Hot
        'opt-3': [],
    });

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                // 절대 경로 사용을 보장하기 위해 /api/menus로 시작
                const res = await fetch(`/api/menus/${id}`);
                const data = await res.json();
                setMenu(data);
            } catch (err) {
                toast.error("메뉴 정보를 가져오는데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, [id]);

    const handleOptionToggle = (optionId: string, itemId: string, type: 'radio' | 'checkbox') => {
        setSelectedOptions(prev => {
            const current = prev[optionId] || [];
            if (type === 'radio') {
                return { ...prev, [optionId]: [itemId] };
            } else {
                if (current.includes(itemId)) {
                    return { ...prev, [optionId]: current.filter(id => id !== itemId) };
                } else {
                    return { ...prev, [optionId]: [...current, itemId] };
                }
            }
        });
    };

    const calculateTotalPrice = () => {
        if (!menu) return 0;
        let total = menu.price;
        Object.entries(selectedOptions).forEach(([optId, itemIds]) => {
            const opt = MENU_OPTIONS.find(o => o.id === optId);
            itemIds.forEach(itemId => {
                const item = opt?.items.find(i => i.id === itemId);
                if (item) total += item.priceDelta;
            });
        });
        return total * quantity;
    };

    const getFormattedOptions = (): CartItemOption[] => {
        const result: CartItemOption[] = [];
        Object.entries(selectedOptions).forEach(([optId, itemIds]) => {
            const opt = MENU_OPTIONS.find(o => o.id === optId);
            itemIds.forEach(itemId => {
                const item = opt?.items.find(i => i.id === itemId);
                if (item && opt) {
                    result.push({
                        optionName: opt.name,
                        itemName: item.name,
                        priceDelta: item.priceDelta
                    });
                }
            });
        });
        return result;
    };

    const handleAddToCart = () => {
        if (!menu) return;

        addToCart({
            menuId: menu.id,
            korName: menu.korName,
            engName: menu.engName,
            price: menu.price,
            quantity: quantity,
            options: getFormattedOptions(),
            image: menu.images?.[0]?.srcUrl
        });

        toast.success("장바구니에 담겼습니다.", {
            icon: <ShoppingCart size={20} color="var(--lux-caramel)" />,
        });
    };

    const handleOrder = async () => {
        setActionLoading(true);
        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: [{
                        menuId: Number(id),
                        quantity,
                        options: getFormattedOptions()
                    }]
                })
            });

            if (res.ok) {
                toast.success("주문이 접수되었습니다.", {
                    icon: <CheckCircle2 size={20} color="var(--color-success)" />,
                });
                setTimeout(() => router.push("/"), 2000);
            }
        } catch (err) {
            toast.error("주문에 실패했습니다.");
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) return (
        <div className={styles.loadingCenter}>
            <div className={styles.spinnerLarge}></div>
        </div>
    );

    if (!menu) return <div className={styles.loadingCenter}>메뉴를 찾을 수 없습니다.</div>;

    return (
        <main className={styles.main}>
            <Toaster />

            <button onClick={() => router.back()} className={styles.backButton}>
                <ChevronLeft size={24} />
            </button>

            <section className={styles.imageSection}>
                <div className={styles.imageContainer}>
                    {menu.images && menu.images[0] ? (
                        <Image src={menu.images[0].srcUrl.startsWith('http') ? menu.images[0].srcUrl : `/images/${menu.images[0].srcUrl}`} alt={menu.korName} fill className={styles.productImage} priority />
                    ) : (
                        <div className="flex items-center justify-center h-full bg-gray-50 text-gray-400">No Image</div>
                    )}
                </div>
            </section>

            <div className={styles.contentWrapper}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <div className={styles.info}>
                            <h1 className={styles.title}>{menu.korName}</h1>
                            <p className={styles.engTitle}>{menu.engName}</p>
                        </div>
                        <div className={styles.price}>
                            ₩ {menu.price.toLocaleString()}
                        </div>
                    </div>

                    <div className={styles.divider} />

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>메뉴 설명</h2>
                        <p className={styles.description}>
                            {menu.description || "이 메뉴에 대한 풍부한 영양소와 최상급 재료를 만나보세요."}
                        </p>
                    </section>

                    {/* Options Section */}
                    {MENU_OPTIONS.map(option => (
                        <section key={option.id} className={styles.optionGroup}>
                            <h2 className={styles.sectionTitle}>{option.name} {option.required && "(필수)"}</h2>
                            <div className={styles.optionGrid}>
                                {option.items.map(item => (
                                    <button
                                        key={item.id}
                                        className={`${styles.optionButton} ${(selectedOptions[option.id] || []).includes(item.id) ? styles.optionButtonActive : ""}`}
                                        onClick={() => handleOptionToggle(option.id, item.id, option.type)}
                                    >
                                        <span>{item.name}</span>
                                        {item.priceDelta > 0 && <span className={styles.optionPrice}>+{item.priceDelta.toLocaleString()}원</span>}
                                    </button>
                                ))}
                            </div>
                        </section>
                    ))}

                    <div className={styles.quantitySection}>
                        <span className={styles.quantityLabel}>수량 선택</span>
                        <div className={styles.quantityControls}>
                            <button
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                className={styles.controlButton}
                            >
                                <Minus size={20} />
                            </button>
                            <span className={styles.quantityValue}>{quantity}</span>
                            <button
                                onClick={() => setQuantity(q => q + 1)}
                                className={`${styles.controlButton} ${styles.controlButtonPrimary}`}
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.footerActions}>
                    <button className={styles.cartButton} onClick={handleAddToCart} title="장바구니 담기">
                        <ShoppingCart size={24} />
                    </button>
                    <button
                        onClick={handleOrder}
                        disabled={actionLoading}
                        className={styles.orderButton}
                    >
                        {actionLoading ? (
                            <div className={styles.loader}></div>
                        ) : (
                            <span>₩ {calculateTotalPrice().toLocaleString()} 주문하기</span>
                        )}
                    </button>
                </div>
            </div>
        </main>
    );
}
