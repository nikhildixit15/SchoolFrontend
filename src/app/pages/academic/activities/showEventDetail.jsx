"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./showEventDetail.module.css";

const DUMMY_IMAGES = [
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  "https://images.unsplash.com/photo-1515169067865-5387ec356754",
  "https://images.unsplash.com/photo-1503428593586-e225b39bddfe",
  "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b"
];


const EventDetail = ({ event, onBack, onDelete }) => {
  const [current, setCurrent] = useState(0);
   const router = useRouter();
 const eventId = event._id;

const handleRegister = () => {
  router.push(
    `/pages/academic/activities/register?eventId=${eventId}`
  );
};


  const images =
    event.images && event.images.length > 0
      ? event.images
      : DUMMY_IMAGES;

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };


  return (
    <div className={styles.detailWrapper}>
      {/* 🔙 Back */}
      <button className={styles.backBtn} onClick={onBack}>
        ← Back to Events
      </button>

      <div className={styles.detailCard}>
        {/* 🖼 Image Slider */}
        {images.length > 0 && (
          <div className={styles.slider}>
            <img
              src={images[current]}
              alt="event"
              className={styles.sliderImage}
            />

            {images.length > 1 && (
              <>
                <button className={styles.prev} onClick={prevSlide}>
                  ❮
                </button>
                <button className={styles.next} onClick={nextSlide}>
                  ❯
                </button>
              </>
            )}
          </div>
        )}

        {/* 📌 Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>{event.title}</h2>
          <span
            className={`${styles.status} ${
              styles[event.status?.toLowerCase()]
            }`}
          >
            {event.status}
          </span>
        </div>

        {/* 📊 Info */}
        <div className={styles.infoGrid}>
          <div>
            <label>Date</label>
            <p>{new Date(event.date).toLocaleDateString()}</p>
          </div>

          <div>
            <label>Time</label>
            <p>{event.startTime} – {event.endTime}</p>
          </div>

          <div>
            <label>Location</label>
            <p>{event.location}</p>
          </div>

          <div>
            <label>Audience</label>
            <p>{event.audience?.join(", ")}</p>
          </div>
        </div>

        {/* 🎯 Actions */}
        <div className={styles.btnGroup}>
          <button
            className={styles.deleteBtn}
            onClick={() => onDelete(event._id)}
          >
            Delete Event
          </button>

           <button
          className={styles.registerBtn}
          onClick={handleRegister}
        >
          Register Now
        </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
