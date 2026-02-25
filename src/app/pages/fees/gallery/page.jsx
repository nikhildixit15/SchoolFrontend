"use client";

import React, { useState, useEffect } from "react";
import { Upload, X, Trash2, ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import styles from "./page.module.css";

export default function ImageFlow() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [admin, setAdmin] = useState(true);

  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("http://localhost:8000/images");
        const data = await res.json();
        setGalleryImages(data);
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    };
    fetchImages();
  }, []);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!category || !type) {
      toast.error("Please select both Category and Type first");
      return;
    }

    for (const file of files) {
      const newFile = {
        id: Date.now() + Math.random(),
        name: file.name,
        progress: 0,
      };

      setUploadedFiles((prev) => [...prev, newFile]);

      const formData = new FormData();
      formData.append("image", file);
      formData.append("category", category);
      formData.append("type", type);

      try {
        const response = await fetch("http://localhost:8000/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (data.url) {
          setGalleryImages((prev) => [
            { url: data.url, public_id: data.public_id, category, type },
            ...prev,
          ]);
          toast.success(`${file.name} uploaded successfully`);
        }

        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === newFile.id ? { ...f, progress: 100 } : f)),
        );

        setTimeout(() => {
          setUploadedFiles((prev) => prev.filter((f) => f.id !== newFile.id));
        }, 1000);
      } catch (err) {
        toast.error("Upload failed");
        console.error(err);
      }
    }
  };

  const handleDelete = async (file) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      const res = await fetch("http://localhost:8000/deleteImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: file.public_id }),
      });

      const data = await res.json();
      if (data.success) {
        setGalleryImages((prev) =>
          prev.filter((img) => img.public_id !== file.public_id),
        );
        toast.success("Image deleted");
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className={styles.container}>
      {/* Admin Panel */}
      {admin && (
        <div className={styles.adminPanel}>
          <h2 style={{ marginBottom: "1rem", color: "#003366" }}>
            Admin Gallery Manager
          </h2>
          <div className={styles.selectorGroup}>
            <select
              className={styles.selectInput}
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setType("");
              }}
            >
              <option value="">Select Category</option>
              <option value="sports">Sports</option>
              <option value="events">Events</option>
            </select>

            {category && (
              <select
                className={styles.selectInput}
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">
                  Select {category === "sports" ? "Sport" : "Event"}
                </option>
                {category === "sports" ? (
                  <>
                    <option value="cricket">Cricket</option>
                    <option value="football">Football</option>
                    <option value="hockey">Hockey</option>
                  </>
                ) : (
                  <>
                    <option value="holi">Holi</option>
                    <option value="diwali">Diwali</option>
                    <option value="annual-function">Annual Function</option>
                  </>
                )}
              </select>
            )}
          </div>

          <label className={styles.uploadLabel}>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
            <div className={styles.uploadBox}>
              <Upload className={styles.uploadIcon} />
              <p>
                <strong>Click to upload</strong> or drag and drop
              </p>
              <span style={{ fontSize: "0.8rem", color: "#666" }}>
                PNG, JPG or WebP up to 10MB
              </span>
            </div>
          </label>

          {/* Progress Section */}
          <div className={styles.progressList}>
            {uploadedFiles.map((file) => (
              <div key={file.id} style={{ marginBottom: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.85rem",
                  }}
                >
                  <span>{file.name}</span>
                  <span>{file.progress}%</span>
                </div>
                <div className={styles.progressItem}>
                  <div
                    className={styles.progressBar}
                    style={{ width: `${file.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Section */}
      <h3 style={{ borderBottom: "2px solid #eee", paddingBottom: "10px" }}>
        Recent Gallery
      </h3>
      {/* Gallery Grid */}
      <div className={styles.galleryGrid}>
        {galleryImages.map((img, idx) => (
          <div key={img.public_id || idx} className={styles.galleryItem}>
            {/* Top Image Part */}
            <div
              className={styles.imageContainer}
              onClick={() => setZoomedImage(img.url)}
            >
              <img src={img.url} alt={img.type} loading="lazy" />
            </div>

            {/* Bottom Info Part */}
            <div className={styles.cardFooter}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <span className={styles.tagBadge}>{img.type || "General"}</span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    color: "#94a3b8",
                    textTransform: "capitalize",
                  }}
                >
                  {img.category}
                </span>
              </div>

              {admin && (
                <button
                  className={styles.deleteIconBtn}
                  title="Delete Image"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(img);
                  }}
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {zoomedImage && (
        <div className={styles.lightbox} onClick={() => setZoomedImage(null)}>
          <button
            className={styles.closeBtn}
            style={{
              position: "absolute",
              top: 30,
              right: 30,
              color: "white",
              background: "none",
              border: "none",
            }}
          >
            <X size={40} />
          </button>
          <img src={zoomedImage} className={styles.zoomedImg} alt="Enlarged" />
        </div>
      )}
    </div>
  );
}
