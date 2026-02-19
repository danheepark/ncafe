"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./LandingPage.module.css";

const reviews = [
  {
    text: "정말 조용한 아침을 맞이하게 됐어요. 메뉴 수정이 너무 편합니다.",
    author: "연남동 카페 느릿",
  },
  {
    text: "손님들이 주문하는 과정이 훨씬 깔끔해졌다고 좋아하세요.",
    author: "성수동 블루노트",
  },
  {
    text: "반복되는 질문이 사라지니 손님과 눈을 맞추는 시간이 늘었습니다.",
    author: "제주 하이디",
  },
  {
    text: "복잡한 프로그램 대신 이걸 쓰니 카페 운영이 재미있어졌어요.",
    author: "한남동 모닝글로리",
  },
  {
    text: "직원 교육도 필요 없을 정도로 UI가 직관적이고 아름답습니다.",
    author: "부산 해변카페",
  },
];

export default function Home() {
  return (
    <div className={styles.pageWrapper}>
      {/* HERO SECTION */}
      <header className={styles.heroContainer}>
        <div className={styles.heroLeft}>
          <Image
            src="/hero-new.jpg"
            alt="Cafe Interior"
            fill
            priority
            className={styles.heroLeftImage}
          />
        </div>

        <div className={styles.heroRight}>
          <span className={styles.topNote}>
            작은 변화로, 더 여유로운 하루를.
          </span>

          <h1 className={styles.headline}>
            당신의 카페를 <br />
            더 편안하게 운영하세요
          </h1>

          <p className={styles.subtext}>
            메뉴 관리부터 주문 정리까지 <br />
            카페 운영을 조금 더 단순하게.
          </p>

          <div className={styles.ctaArea}>
            <Link href="/admin/menus" className={styles.primaryCTA}>
              지금 시작하기
            </Link>
            <Link href="/admin/login" className={styles.secondaryCTA}>
              로그인
            </Link>
          </div>

        </div>
      </header>

      {/* SECTION 1 — 한 줄 소개 (여백 섹션) */}
      <section className={`${styles.section} ${styles.introSection}`}>
        <div className={styles.introLineWrapper}>
          <div className={styles.introLine}></div>
        </div>
        <h2 className={styles.headline_md}>카페 운영이 조금 더 가벼워지도록</h2>
        <p className={styles.description}>
          복잡한 관리 대신 <br />
          손님과 공간에 더 집중할 수 있도록 돕습니다.
        </p>

        <div className={styles.benefitStats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>30%+</span>
            <span className={styles.statLabel}>운영 시간 단축</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>1.5x</span>
            <span className={styles.statLabel}>주문 처리 속도</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>0%</span>
            <span className={styles.statLabel}>불필요한 비용</span>
          </div>
        </div>
      </section>

      {/* SECTION 2 — 이미지 + 텍스트 (좌우 분할) */}
      <section className={styles.splitSection}>
        <div className={styles.splitImageWrapper}>
          <Image
            src="/section-coffee.png"
            alt="Coffee on wooden table"
            fill
            className={styles.backgroundImage}
          />
        </div>
        <div className={styles.splitContent}>
          <div className={styles.introLineWrapper}>
            <div className={`${styles.introLine} ${styles.introLineLeft}`}></div>
          </div>
          <h3 className={styles.headline_md}>메뉴와 주문을 한 곳에서</h3>
          <p className={styles.description}>
            메뉴 수정, 주문 확인, 관리까지 <br />
            여러 도구를 오가지 않아도 됩니다.
          </p>
        </div>
      </section>

      {/* SECTION 3 — 반대 레이아웃 */}
      <section className={`${styles.splitSection} ${styles.reverse}`}>
        <div className={styles.splitImageWrapper}>
          <Image
            src="/section-nature.png"
            alt="Serene cafe garden"
            fill
            className={styles.backgroundImage}
          />
        </div>
        <div className={styles.splitContent}>
          <div className={styles.introLineWrapper}>
            <div className={`${styles.introLine} ${styles.introLineRight}`}></div>
          </div>
          <h3 className={styles.headline_md}>고객 응대를 더 단순하게</h3>
          <p className={styles.description}>
            반복되는 안내와 문의를 줄이고 <br />
            더 중요한 순간에 집중하세요.
          </p>
        </div>
      </section>

      {/* TESTIMONIAL MARQUEE SECTION */}
      <section className={styles.reviewSection}>
        <h2 className={styles.reviewTitle}>공간에 온전히 집중하게 된 사람들의 이야기</h2>
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            {reviews.map((review, index) => (
              <div key={index} className={styles.reviewCard}>
                <p className={styles.reviewText}>&ldquo;{review.text}&rdquo;</p>
                <span className={styles.reviewAuthor}>— {review.author}</span>
              </div>
            ))}
          </div>
          <div className={styles.marqueeTrack} aria-hidden="true">
            {reviews.map((review, index) => (
              <div key={index} className={styles.reviewCard}>
                <p className={styles.reviewText}>&ldquo;{review.text}&rdquo;</p>
                <span className={styles.reviewAuthor}>— {review.author}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — 감성 풀폭 이미지 섹션 */}
      <section className={styles.fullWidthSection}>
        <Image
          src="/fullwidth-new.jpg"
          alt="Panoramic cafe terrace"
          fill
          className={styles.backgroundImage}
          style={{ objectFit: "cover" }}
        />
        <div className={styles.bottomOverlay} />
        <h2 className={styles.fullWidthHeadline}>
          작은 변화로,
          <br /> 하루가 달라집니다
        </h2>
      </section>

      {/* SECTION 5 — 작은 기능 소개 (미니멀 3컬럼) */}
      <section className={styles.featureSection}>
        <div className={styles.featureItem}>
          <span className={`material-symbols-rounded ${styles.featureIcon}`}>
            edit_note
          </span>
          <h4 className={styles.featureTitle}>메뉴 관리</h4>
          <p className={styles.description}>간단한 수정과 빠른 적용.</p>
        </div>
        <div className={styles.featureItem}>
          <span className={`material-symbols-rounded ${styles.featureIcon}`}>
            assignment_turned_in
          </span>
          <h4 className={styles.featureTitle}>주문 정리</h4>
          <p className={styles.description}>한눈에 확인하는 주문 흐름</p>
        </div>
        <div className={styles.featureItem}>
          <span className={`material-symbols-rounded ${styles.featureIcon}`}>
            analytics
          </span>
          <h4 className={styles.featureTitle}>운영 기록</h4>
          <p className={styles.description}>카페 운영을 더 체계적으로</p>
        </div>
      </section>

      {/* SECTION 6 — 마지막 CTA */}
      <section className={`${styles.section} ${styles.finalSection}`}>
        <h2 className={styles.headline_md}>지금, 조금 더 편안한 운영을 시작하세요</h2>
        <Link
          href="/admin/menus"
          className={`${styles.primaryCTA} ${styles.finalButton}`}
        >
          지금 시작하기
        </Link>
      </section>
    </div>
  );
}
