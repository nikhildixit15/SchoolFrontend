// components/Footer/Footer.jsx
// Next.js compatible — uses next/link for internal routes.
// Replace <a> with <Link href="..."> in your project if preferred.

import styles from "./footer.module.css";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { SiFacebook, SiInstagram, SiLinkedin, SiYoutube } from "react-icons/si";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/pages/footerPages/aboutUs" },
   { label: "Admissions", href: "/pages/footerPages/admission" },
  { label: "Contact", href: "/pages/footerPages/contractUs" },
];

const importantLinks = [
  { label: "Notice Board", href: "/notices" },
  { label: "Gallery", href: "/pages/galleryEvents" },
  { label: "Student Portal", href: "/portal" },
  { label: "Library", href: "/library" },
];

const socials = [
  { Icon: SiFacebook, label: "Facebook", href: "https://facebook.com" },
  { Icon: SiInstagram, label: "Instagram", href: "https://instagram.com" },
  { Icon: SiLinkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { Icon: SiYoutube, label: "YouTube", href: "https://youtube.com" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      {/* ── MAIN CONTENT ── */}
      <div className={styles.topStrip}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Brand */}
            <div className={styles.brand}>
              <div className={styles.logoWrapper}>
                <div aria-hidden="true">⭐</div>
                <div className={styles.logoText}>
                  <span className={styles.collegeName}>BNSD College</span>
                  <span className={styles.collegeTagline}>
                    Est. 1952 · Excellence in Education
                  </span>
                </div>
              </div>
              <p className={styles.description}>
                Nurturing intellect, character, and leadership for over seven
                decades. Ashford College is committed to academic excellence and
                holistic development of every student.
              </p>
              <div className={styles.accreditation}>
                <span className={styles.badge}>NAAC A++</span>
                <span className={styles.badge}>UGC Approved</span>
              </div>
            </div>

            {/* Quick Links */}
            <nav className={styles.column} aria-label="Quick links">
              <h3 className={styles.colTitle}>Quick Links</h3>
              <ul className={styles.linkList}>
                {quickLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Important Links */}
            <nav className={styles.column} aria-label="Important links">
              <h3 className={styles.colTitle}>Important Links</h3>
              <ul className={styles.linkList}>
                {importantLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact */}
            <address className={styles.column} style={{ fontStyle: "normal" }}>
              <h3 className={styles.colTitle}>Contact Us</h3>
              <ul className={styles.contactList}>
                <li className={styles.contactItem}>
                  <span className={styles.contactIcon} aria-hidden="true">
                    <FiMapPin />
                  </span>
                  <span>
                    12 University Road, Academic Quarter,
                    <br />
                    New Delhi — 110 001, India
                  </span>
                </li>
                <li className={styles.contactItem}>
                  <span className={styles.contactIcon} aria-hidden="true">
                    <FiPhone />
                  </span>
                  <a href="tel:+911123456789">+91 11 2345 6789</a>
                </li>
                <li className={styles.contactItem}>
                  <span className={styles.contactIcon} aria-hidden="true">
                    <FiMail />
                  </span>
                  <a href="mailto:info@ashfordcollege.edu.in">
                    info@bsndcollege.edu.in
                  </a>
                </li>
              </ul>
            </address>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className={styles.bottomBar}>
        <div className={styles.container}>
          <div className={styles.bottomInner}>
            <p className={styles.copyright}>
              © {year} <strong>BNSD College</strong>. All rights reserved.
            </p>

            {/* Social Icons */}
            <nav className={styles.socials} aria-label="Social media">
              {socials.map(({ Icon: SocialIcon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className={styles.socialLink}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon />
                </a>
              ))}
            </nav>

            <nav className={styles.bottomLinks} aria-label="Legal links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Use</a>
              <a href="/sitemap">Sitemap</a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
