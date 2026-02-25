"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { SiFacebook, SiInstagram, SiLinkedin, SiYoutube } from "react-icons/si";
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}. Your message has been sent!`);
    // Handle API logic here
  };

  return (
    <main className={styles.contactPage}>
      {/* Header */}
      <section className={styles.header}>
        <h1>Contact Us</h1>
        <p>
          Have questions? Our admissions team and faculty are here to help you
          navigate your academic journey.
        </p>
      </section>

      <div className={styles.container}>
        {/* Contact Information */}
        <aside className={styles.infoSection}>
          <h2>Get in Touch</h2>

          <div className={styles.infoItem}>
            <MapPin size={24} color="#003366" />
            <div>
              <h4>Campus Address</h4>
              <p>
                123 University Ave, Academic Square
                <br />
                Boston, MA 02115
              </p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <Phone size={24} color="#003366" />
            <div>
              <h4>Phone Number</h4>
              <p>+1 (555) 012-3456</p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <Mail size={24} color="#003366" />
            <div>
              <h4>Email Address</h4>
              <p>admissions@college.edu</p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <Clock size={24} color="#003366" />
            <div>
              <h4>Office Hours</h4>
              <p>Mon - Fri: 9:00 AM - 5:00 PM</p>
            </div>
          </div>

          {/* Social Media Links */}
          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
            <SiFacebook size={20} />
            <SiInstagram size={20} />
            <SiLinkedin size={20} />
            <SiYoutube size={20} />
          </div>
        </aside>

        {/* Contact Form */}
        <section>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                required
                className={styles.input}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                required
                className={styles.input}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                required
                className={styles.input}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows={5}
                required
                className={styles.textarea}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              ></textarea>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Send Message
            </button>
          </form>
        </section>
      </div>

      {/* Google Map Embed */}
      <section className={styles.mapContainer}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7106.866928492475!2d79.9101291009462!3d27.048062460226028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399e6f3cd7d8980b%3A0x737c8bc8494190f1!2sVishal%20Mega%20Mart!5e0!3m2!1sen!2sin!4v1771916015572!5m2!1sen!2sin"
          width="100%"
          height="100%"
          loading="lazy"
          title="College Location"
        ></iframe>
      </section>
    </main>
  );
};

export default ContactPage;
