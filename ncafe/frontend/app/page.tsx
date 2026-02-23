"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./LandingPage.module.css";

const reviews = [
    {
        text: "통창으로 들어오는 햇살 아래서 작업을 하니 평소보다 집중이 훨씬 잘 됐어요. 공간이 주는 몰입감이 대단합니다.",
        author: "N.CAFE 성수점 방문객",
    },
    {
        text: "팀 미팅 장소를 찾다가 방문했는데, 테이블 간격도 넓고 분위기가 차분해서 성공적으로 회의를 마쳤습니다.",
        author: "스타트업 기획자 L님",
    },
    {
        text: "커피 한 잔과 함께 온전히 나만의 시간을 보낼 수 있는 최고의 장소예요. 인테리어가 정말 고급스러워요.",
        author: "단골 손님 김은지님",
    },
    {
        text: "다양한 지점이 있어서 어디서든 이 프리미엄한 감각을 즐길 수 있다는 게 브랜드의 가장 큰 장점인 것 같아요.",
        author: "프리랜서 디자이너 박현우님",
    },
    {
        text: "공간의 온도와 조도까지 세심하게 신경 쓴 게 느껴집니다. 단순히 커피를 마시는 곳 이상의 경험이었어요.",
        author: "건축 디자이너 정재희님",
    },
];

export default function Home() {
    return (
        <div className={styles.pageWrapper}>
            {/* HEADER / NAVIGATION */}
            <nav className={styles.nav}>
                <Link href="/login?type=admin" className={styles.adminLink}>
                    내사장이오
                </Link>
            </nav>

            {/* HERO SECTION */}
            <header className={styles.heroContainer}>
                <div className={styles.heroLeft}>
                    <Image
                        src="/hero-new.jpg"
                        alt="Premium Cafe Interior"
                        fill
                        priority
                        className={styles.heroLeftImage}
                    />
                </div>

                <div className={styles.heroRight}>
                    <span className={styles.topNote}>
                        오직 당신만을 위해 설계된 공간.
                    </span>

                    <h1 className={styles.headline}>
                        당신의 일상에 <br />
                        감각적인 여유를 더하세요.
                    </h1>

                    <p className={styles.subtext}>
                        N.CAFE는 단순한 카페를 넘어 정체성 있는 공간을 제공합니다. <br />
                        전국 모든 지점에서 프리미엄 공간의 가치를 느껴보세요.
                    </p>

                    <div className={styles.ctaArea}>
                        <Link href="/menus" className={styles.primaryCTA}>
                            주문하기
                        </Link>
                        <Link href="/login?type=customer" className={styles.secondaryCTA}>
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
                <h2 className={styles.headline_md}>머무름의 가치를 아는 당신을 위해</h2>
                <p className={styles.description}>
                    업무에 몰입하거나, 깊은 대화를 나누거나, <br />
                    혹은 온전한 휴식을 취할 수 있는 최적의 환경을 선사합니다.
                </p>

                <div className={styles.benefitStats}>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>12+</span>
                        <span className={styles.statLabel}>전국 직영 지점</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>1.2m</span>
                        <span className={styles.statLabel}>넉넉한 테이블 간격</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>100%</span>
                        <span className={styles.statLabel}>스페셜티 원두</span>
                    </div>
                </div>
            </section>

            {/* SECTION 2 — 이미지 + 텍스트 (좌우 분할) */}
            <section className={styles.splitSection}>
                <div className={styles.splitImageWrapper}>
                    <Image
                        src="/section2.jpg"
                        alt="Work intensive space"
                        fill
                        className={styles.backgroundImage}
                    />
                </div>
                <div className={styles.splitContent}>
                    <div className={styles.introLineWrapper}>
                        <div className={`${styles.introLine} ${styles.introLineLeft}`}></div>
                    </div>
                    <h3 className={styles.headline_md}>몰입을 돕는 감각적인 배치</h3>
                    <p className={styles.description}>
                        집중이 필요한 순간, N.CAFE의 정돈된 가구 배치와 <br />
                        차분한 조명이 당신의 영감을 자극할 것입니다.
                    </p>
                </div>
            </section>

            {/* SECTION 3 — 반대 레이아웃 */}
            <section className={`${styles.splitSection} ${styles.reverse}`}>
                <div className={styles.splitImageWrapper}>
                    <Image
                        src="/section3.jpg"
                        alt="Elegant meeting place"
                        fill
                        className={styles.backgroundImage}
                    />
                </div>
                <div className={styles.splitContent}>
                    <div className={styles.introLineWrapper}>
                        <div className={`${styles.introLine} ${styles.introLineRight}`}></div>
                    </div>
                    <h3 className={styles.headline_md}>함께 나누는 즐거운 시간</h3>
                    <p className={styles.description}>
                        소중한 인연과 함께하는 대화가 더욱 빛나도록 <br />
                        우아하고 따뜻한 분위기의 공간을 준비했습니다.
                    </p>
                </div>
            </section>

            {/* TESTIMONIAL MARQUEE SECTION */}
            <section className={styles.reviewSection}>
                <h2 className={styles.headline_md}>공간을 경험한 분들의 이야기</h2>
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
                    src="/section4.jpg"
                    alt="Panoramic lounge view"
                    fill
                    className={styles.backgroundImage}
                    style={{ objectFit: "cover" }}
                />
                <div className={styles.bottomOverlay} />
                <h2 className={styles.fullWidthHeadline}>
                    단순히 마시는 공간을 넘어, <br />당신의 가치를 채우는 곳.
                </h2>
            </section>

            {/* SECTION 5 — 작은 기능 소개 (미니멀 3컬럼) */}
            <section className={styles.featureSection}>
                <div className={styles.featureItem}>
                    <span className={`material-symbols-rounded ${styles.featureIcon}`}>
                        bolt
                    </span>
                    <h4 className={styles.featureTitle}>초고속 네트워크</h4>
                    <p className={styles.description}>모든 지점에서 끊김 없는 환경을 제공합니다.</p>
                </div>
                <div className={styles.featureItem}>
                    <span className={`material-symbols-rounded ${styles.featureIcon}`}>
                        spa
                    </span>
                    <h4 className={styles.featureTitle}>에코 플랜테리어</h4>
                    <p className={styles.description}>도심 속에서도 자연의 숨결을 느낄 수 있는 <br /> 녹색 공간을 제안합니다.</p>
                </div>
                <div className={styles.featureItem}>
                    <span className={`material-symbols-rounded ${styles.featureIcon}`}>
                        album
                    </span>
                    <h4 className={styles.featureTitle}>큐레이션 서비스</h4>
                    <p className={styles.description}>공간에 어울리는 엄선된 도서와 음악을 제안합니다.</p>
                </div>
            </section>

            {/* SECTION 6 — 마지막 CTA */}
            <section className={`${styles.section} ${styles.finalSection}`}>
                <div className={styles.introLine}></div>
                <h2 className={styles.headline_md}>지금 바로 당신의 공간을 찾아보세요.</h2>
                <Link
                    href="/menus"
                    className={`${styles.primaryCTA} ${styles.finalButton}`}
                >
                    주문하기
                </Link>
            </section>
        </div>
    );
}
