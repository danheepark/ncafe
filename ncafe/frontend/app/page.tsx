import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { Coffee, MapPin, Clock, ArrowRight, Instagram, Facebook, Twitter } from "lucide-react";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.navLogo}>
          <span className={styles.logoText}>NEW CAFE</span>
        </div>
        <div className={styles.navLinks}>
          <Link href="#about">About</Link>
          <Link href="/admin/menus" className={styles.menuLink}>Menu</Link>
          <Link href="#contact" className={styles.contactBtn}>Contact</Link>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroImageWrapper}>
            <img
              src="/static/hero-cafe.png"
              alt="Premium Cafe Interior"
              className={styles.heroImage}
            />
            <div className={styles.heroOverlay}></div>
          </div>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Experience the Art of <br />
              <span className={styles.highlightText}>Perfect Coffee</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Crafted with passion, served with elegance. Your daily escape into a world of rich aromas and premium tastes.
            </p>
            <div className={styles.heroActions}>
              <Link href="/admin/menus" className={styles.primaryBtn}>
                Explore Menu <ArrowRight size={20} />
              </Link>
              <Link href="#about" className={styles.secondaryBtn}>
                Our Story
              </Link>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section id="about" className={styles.introSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.introGrid}>
              <div className={styles.introText}>
                <span className={styles.sectionLabel}>OUR PHILOSOPHY</span>
                <h2 className={styles.sectionTitle}>More Than Just Coffee</h2>
                <p className={styles.sectionDesc}>
                  At New Cafe, we believe that every cup tells a story. From the selection of premium single-origin beans to the precise roasting process, we are dedicated to providing an unparalleled sensory experience.
                </p>
                <div className={styles.features}>
                  <div className={styles.featureItem}>
                    <div className={styles.featureIcon}><Coffee size={24} /></div>
                    <div>
                      <h3>Specialty Beans</h3>
                      <p>Sourced from the finest plantations across the globe.</p>
                    </div>
                  </div>
                  <div className={styles.featureItem}>
                    <div className={styles.featureIcon}><Clock size={24} /></div>
                    <div>
                      <h3>Artisan Roasting</h3>
                      <p>Small batches roasted daily to ensure maximum freshness.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.introImageSide}>
                <div className={styles.imageCard}>
                  <Image
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop"
                    alt="Brewing Coffee"
                    width={600}
                    height={800}
                    className={styles.sideImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaBanner}>
          <div className={styles.ctaContent}>
            <h2>Join Our Coffee Community</h2>
            <p>Get notified about new specialty beans and seasonal menus.</p>
            <div className={styles.subscribeBox}>
              <input type="email" placeholder="Your email address" />
              <button>Subscribe</button>
            </div>
          </div>
        </section>

        {/* Contact/Footer Section */}
        <section id="contact" className={styles.footerSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.footerGrid}>
              <div className={styles.footerInfo}>
                <h2 className={styles.logoText}>NEW CAFE</h2>
                <p>Pure taste, premium moments.</p>
                <div className={styles.socialLinks}>
                  <Instagram size={20} />
                  <Facebook size={20} />
                  <Twitter size={20} />
                </div>
              </div>
              <div className={styles.footerLinks}>
                <h3>Quick Links</h3>
                <Link href="/admin/menus">Menu</Link>
                <Link href="#about">Story</Link>
                <Link href="#contact">Location</Link>
              </div>
              <div className={styles.footerContact}>
                <h3>Visit Us</h3>
                <p><MapPin size={16} /> 123 Barista Street, Seoul</p>
                <p><Clock size={16} /> Mon - Sun: 08:00 - 22:00</p>
              </div>
            </div>
            <div className={styles.footerBottom}>
              <p>&copy; 2026 New Cafe. All rights reserved.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
