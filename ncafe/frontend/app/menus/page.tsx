"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Coffee, Search, ShoppingBag } from "lucide-react";
import styles from "../MenuPage.module.css";

interface Menu {
  id: number;
  korName: string;
  engName: string;
  description: string;
  price: number;
  categoryName: string;
  images: { srcUrl: string }[];
}

export default function MenuListPage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string; icon?: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 손님 API 엔드포인트(/api/menus, /api/categories)로 요청
        const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
        const catRes = await fetch(`${apiBase}/categories`);
        const catData = await catRes.json();
        if (Array.isArray(catData)) {
          setCategories(catData);
        } else if (catData && Array.isArray(catData.categories)) {
          setCategories(catData.categories);
        }

        const menuRes = await fetch(`${apiBase}/menus`);
        const menuData = await menuRes.json();
        if (menuData && Array.isArray(menuData.menus)) {
          setMenus(menuData.menus);
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredMenus = menus.filter((menu) => {
    const matchesCategory = selectedCategory ? menu.categoryName === categories.find(c => c.id === selectedCategory)?.name : true;
    const matchesSearch = menu.korName.includes(searchTerm) || menu.engName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo}>N.CAFE</Link>
          <button className={styles.cartButton}>
            <ShoppingBag size={24} />
          </button>
        </div>
      </header>

      <section className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} size={20} />
          <input
            type="text"
            placeholder="어떤 메뉴를 찾으시나요?"
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.categoryList}>
          <button
            onClick={() => setSelectedCategory(null)}
            className={`${styles.categoryButton} ${selectedCategory === null ? styles.categoryButtonActive : ""}`}
          >
            <span className="material-symbols-rounded" style={{ fontSize: '18px' }}>grid_view</span>
            <span>전체</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`${styles.categoryButton} ${selectedCategory === cat.id ? styles.categoryButtonActive : ""}`}
            >
              {cat.icon && <span className={styles.categoryIcon}>{cat.icon}</span>}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.menuGrid}>
        {loading ? (
          <div className={styles.loadingGrid}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        ) : (
          filteredMenus.map((menu) => (
            <Link key={menu.id} href={`/menus/${menu.id}`} className={styles.menuCard}>
              <div className={styles.imageWrapper}>
                {menu.images && menu.images[0] ? (
                  <Image
                    src={(() => {
                      const srcUrl = menu.images[0].srcUrl;
                      if (srcUrl.startsWith('http://localhost:8080/')) {
                        return '/upload/' + srcUrl.split('8080/')[1];
                      }
                      if (srcUrl.startsWith('http')) {
                        return srcUrl;
                      }
                      if (srcUrl.startsWith('/admin/')) {
                        return srcUrl.replace('/admin/', '/upload/');
                      }
                      return `/upload/${srcUrl}`;
                    })()}
                    alt={menu.korName}
                    fill
                    className={styles.menuImage}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Coffee size={48} color="#ddd" />
                  </div>
                )}
                <div className={styles.priceTag}>
                  ₩ {menu.price.toLocaleString()}
                </div>
              </div>
              <div className={styles.cardContent}>
                <p className={styles.categoryName}>{menu.categoryName}</p>
                <h3 className={styles.menuTitle}>{menu.korName}</h3>
                <p className={styles.description}>{menu.description}</p>
              </div>
            </Link>
          ))
        )}
      </section>
    </main>
  );
}
