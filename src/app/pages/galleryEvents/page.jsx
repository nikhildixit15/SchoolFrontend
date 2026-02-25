"use client"

import React, { useState } from "react";
import styles from "./page.module.css";
import { ChevronRight, X, ArrowLeft } from "lucide-react";

const GalleryPage = () => {
  const [level, setLevel] = useState(1); // 1: Main, 2: Sub-Cats, 3: Photos
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSub, setActiveSub] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const GALLERY_DATA = {
    sports: {
      title: "Sports",
      image: "/sports/image.png",
      subCategories: {
        cricket: {
          title: "Cricket",
          image: "/sports/image1.png",
          images: [
            { src: "/sports/image.png", title: "Inter-College Finals 2025" },
            { src: "/images/c2.jpg", title: "Practice Session" },
          ],
        },
        football: {
          title: "Football",
          image: "/images/football-thumb.jpg",
          images: [{ src: "/images/f1.jpg", title: "Championship Kickoff" }],
        },
        hockey: {
          title: "Hockey",
          image: "/images/hockey-thumb.jpg",
          images: [{ src: "/images/h1.jpg", title: "Annual Sports Meet" }],
        },
      },
    },
    Events: {
      title: "Event",
      image: "/images/sports-main.jpg",
      subCategories: {
        cricket: {
          title: "Cricket",
          image: "/images/cricket-thumb.jpg",
          images: [
            { src: "/images/c1.jpg", title: "Inter-College Finals 2025" },
            { src: "/images/c2.jpg", title: "Practice Session" },
          ],
        },
        football: {
          title: "Football",
          image: "/images/football-thumb.jpg",
          images: [{ src: "/images/f1.jpg", title: "Championship Kickoff" }],
        },
        hockey: {
          title: "Hockey",
          image: "/images/hockey-thumb.jpg",
          images: [{ src: "/images/h1.jpg", title: "Annual Sports Meet" }],
        },
      },
    },
  };

  // Navigation Logic
  const resetToMain = () => {
    setLevel(1);
    setActiveCategory(null);
    setActiveSub(null);
  };
  const toSub = (catKey) => {
    setActiveCategory(catKey);
    setLevel(2);
  };
  const toPhotos = (subKey) => {
    setActiveSub(subKey);
    setLevel(3);
  };

  return (
    <div className={styles.galleryWrapper}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumb}>
        <span onClick={resetToMain}>Gallery</span>
        {level >= 2 && (
          <>
            <ChevronRight size={16} />{" "}
            <span onClick={() => setLevel(2)}>{activeCategory}</span>
          </>
        )}
        {level === 3 && (
          <>
            <ChevronRight size={16} /> <span>{activeSub}</span>
          </>
        )}
      </nav>

      {/* Level 1: Main Categories */}
      {level === 1 && (
        <div className={styles.grid}>
          {Object.entries(GALLERY_DATA).map(([key, data]) => (
            <div key={key} className={styles.card} onClick={() => toSub(key)}>
              <img src={data.image} alt={data.title} loading="lazy" />
              <div className={styles.overlay}>
                <h3>{data.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Level 2: Sub-Categories (Cricket, Football, etc.) */}
      {level === 2 && (
        <div className={styles.grid}>
          {Object.entries(GALLERY_DATA[activeCategory].subCategories).map(
            ([key, data]) => (
              <div
                key={key}
                className={styles.card}
                onClick={() => toPhotos(key)}
              >
                <img src={data.image} alt={data.title} loading="lazy" />
                <div className={styles.overlay}>
                  <h3>{data.title}</h3>
                </div>
              </div>
            ),
          )}
        </div>
      )}

      {/* Level 3: Final Image Gallery */}
      {level === 3 && (
        <div className={styles.grid}>
          {GALLERY_DATA[activeCategory].subCategories[activeSub].images.map(
            (img, idx) => (
              <div key={idx} onClick={() => setSelectedImg(img.src)}>
                <div className={styles.galleryImgWrapper}>
                  <img
                    src={img.src}
                    alt={img.title}
                    className={styles.cardImg}
                    loading="lazy"
                  />
                </div>
                <p className={styles.caption}>{img.title}</p>
              </div>
            ),
          )}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {selectedImg && (
        <div className={styles.modal} onClick={() => setSelectedImg(null)}>
          <button className={styles.closeBtn}>
            <X />
          </button>
          <img src={selectedImg} className={styles.modalImg} alt="Preview" />
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
