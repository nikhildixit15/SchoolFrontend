"use client";
import styles from "./page.module.css";
import { ArrowRight, Globe, Users, GraduationCap } from "lucide-react";

export default function HomePage() {
  const programs = [
    { title: "Engineering", icon: <Globe size={32} />, desc: "Leading edge research and practical tech skills." },
    { title: "Business & Arts", icon: <Users size={32} />, desc: "Develop leadership and creative thinking." },
    { title: "Science & Health", icon: <GraduationCap size={32} />, desc: "Innovating for a healthier, safer world." },
  ];

  return (
    <div>
      {/* HERO */}
      <section className={styles.heroGradient}>
        <div className={styles.container}>
          <span style={{fontWeight:600, color:"#60a5fa", textTransform:"uppercase", letterSpacing:"0.1em", display:"block", marginBottom:"1rem"}}>Welcome to Horizon University</span>
          <h1 className={styles.heroTitle}>
            Empowering Minds, <br />
            <span>Shaping Futures.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Join a community of innovators and leaders. Explore our world-class facilities and diverse academic programs.
          </p>
          <div className={styles.heroButtons}>
            <button className={styles.buttonPrimary}>
              Apply Now <ArrowRight size={18} />
            </button>
            <button className={styles.buttonSecondary}>
              Virtual Tour
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className={styles.statsSection}>
        <div className={`${styles.statsGrid} ${styles.container}`}>
          {[
            { value:"15k+", label:"Students" },
            { value:"120+", label:"Courses" },
            { value:"95%", label:"Placement" },
            { value:"50+", label:"Global Partners" }
          ].map((s, idx) => (
            <div key={idx} className={styles.statItem}>
              <h3>{s.value}</h3>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ACADEMIC PROGRAMS */}
      <section className={`${styles.programsSection} ${styles.container}`}>
        <h2 className={styles.sectionTitle}>Academic Programs</h2>
        <p style={{marginTop:"1rem", color:"#4b5563"}}>Find the path that fits your passion.</p>
        <div className={styles.programsGrid}>
          {programs.map((p, idx) => (
            <div key={idx} className={styles.programCard}>
              <div className={styles.cardIcon}>{p.icon}</div>
              <h3 style={{ fontSize:"1.5rem", fontWeight:"bold", marginBottom:"1rem", color:"#1e293b" }}>{p.title}</h3>
              <p style={{ color:"#4b5563", marginBottom:"1rem" }}>{p.desc}</p>
              <a href="#" style={{ color:"#2563eb", fontWeight:"600", display:"flex", alignItems:"center", gap:"0.5rem" }}>
                Learn More <ArrowRight size={16}/>
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}