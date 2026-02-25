import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { BookOpen, Users, Trophy, Coffee, Microscope, Award } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Excellence in Education</h1>
          <p>Inspiring Minds, Shaping Futures Since 1995</p>
        </div>
      </section>

      {/* History Section */}
      <section className={styles.section}>
        <div className={styles.grid2}>
          <div>
            <h2 className="heading">Our Rich Heritage</h2>
            <p>Founded on the principles of academic rigor and social responsibility, our college has grown from a small institute to a premier educational hub. Over three decades, we have remained committed to providing a holistic environment where students thrive intellectually and personally.</p>
          </div>
          <img src="/api/placeholder/500/300" alt="Campus History" className={styles.principalImg} />
        </div>
      </section>

      {/* Vision & Mission */}
      <section className={`${styles.section} ${styles.visionMission}`}>
        <div className={styles.grid2}>
          <div className={styles.card}>
            <h3>Our Vision</h3>
            <p>To be a global leader in higher education, fostering innovation and producing ethical leaders who contribute to society.</p>
          </div>
          <div className={styles.card}>
            <h3>Our Mission</h3>
            <p>Providing world-class infrastructure, industry-aligned curriculum, and a research-driven environment for student success.</p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className={styles.statsBar}>
        <div className={styles.statItem}><h2>25+</h2><p>Years of Excellence</p></div>
        <div className={styles.statItem}><h2>50+</h2><p>Courses Offered</p></div>
        <div className={styles.statItem}><h2>10k+</h2><p>Successful Alumni</p></div>
        <div className={styles.statItem}><h2>150+</h2><p>Expert Faculty</p></div>
      </div>

      {/* Principal Message */}
      <section className={styles.section}>
        <div className={styles.grid2}>
          <img src="/api/placeholder/400/500" alt="Principal" className={styles.principalImg} />
          <div>
            <h2 className="heading">Message from the Principal</h2>
            <blockquote style={{ fontStyle: 'italic', borderLeft: '4px solid #003366', paddingLeft: '1rem' }}>
              "Education is not just about acquiring degrees; it's about building character and fostering a spirit of inquiry."
            </blockquote>
            <p>- Dr. Jane Smith, PhD</p>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className={styles.section}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Campus Facilities</h2>
        <div className={styles.facilitiesGrid}>
          <FacilityItem icon={<BookOpen />} title="Central Library" desc="50,000+ books and digital journals." />
          <FacilityItem icon={<Microscope />} title="Modern Labs" desc="State-of-the-art research facilities." />
          <FacilityItem icon={<Trophy />} title="Sports Complex" desc="Indoor and outdoor sports arenas." />
          <FacilityItem icon={<Coffee />} title="Student Hub" desc="A vibrant cafeteria and social zone." />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={`${styles.section} ${styles.cta}`}>
        <h2>Ready to start your journey?</h2>
        <p>Join a community that values your growth as much as you do.</p>
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Link href="/admissions" className={styles.btn}>Apply Now</Link>
          <Link href="/pages/footerPages/contractUs" className={styles.btn} style={{background: '#fff', color: '#003366', border: '1px solid #003366'}}>Contact Us</Link>
        </div>
      </section>
    </div>
  );
};

// Reusable Facility Component
const FacilityItem = ({ icon, title, desc }) => (
  <div className={styles.facilityCard}>
    <div style={{ color: '#003366', marginBottom: '1rem' }}>{icon}</div>
    <h4>{title}</h4>
    <p style={{ fontSize: '0.9rem', color: '#666' }}>{desc}</p>
  </div>
);

export default AboutPage;