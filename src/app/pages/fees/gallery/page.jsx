"use client";

import React, { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";

export default function ImageFlow() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [zoomedImage, setZoomedImage] = useState(null); // 👈 new state for zoom
  const [admin, setAdmin] = useState(true); // set to true for testing

  // ✅ Fetch images on load
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("http://localhost:8000/images");
        const data = await res.json();
        console.log("Fetched images:", data);
        setGalleryImages(data);
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    };
    fetchImages();
  }, []);

  // ✅ Handle upload
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    for (const file of files) {
      const newFile = { id: Date.now() + Math.random(), name: file.name, progress: 0 };
      setUploadedFiles((prev) => [...prev, newFile]);

      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch("http://localhost:8000/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json(); // { url, public_id }
        if (data.url && data.public_id) {
          setGalleryImages((prev) => [{ url: data.url, public_id: data.public_id }, ...prev]);
        }

        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === newFile.id ? { ...f, progress: 100 } : f))
        );

        setTimeout(() => {
          setUploadedFiles((prev) => prev.filter((f) => f.id !== newFile.id));
        }, 600);
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }
  };

  // ✅ Handle delete
  const handleDelete = async (file) => {
    try {
      const res = await fetch("http://localhost:8000/deleteImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: file.public_id }),
      });

      const data = await res.json();
      if (data.success) {
        setGalleryImages((prev) =>
          prev.filter((img) => img.public_id !== file.public_id)
        );
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="imageflow">
      <style>{`
        /* Upload Styles */
        .upload-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }
        .upload-item {
          display: flex;
          align-items: center;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 12px 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s ease;
        }
        .upload-item:hover { transform: scale(1.01); }
        .icon-box {
          background: #eff6ff;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
        }
        .icon-box svg { color: #2563eb; }
        .details { flex: 1; }
        .details p {
          font-size: 14px;
          font-weight: 500;
          color: #111827;
          margin-bottom: 6px;
        }
        .progress-bar {
          background: #e5e7eb;
          height: 6px;
          border-radius: 4px;
          overflow: hidden;
          width: 100%;
        }
        .progress-bar .fill {
          background: linear-gradient(90deg, #2563eb, #60a5fa);
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        /* Upload box */
        .upload-header h1 {
          font-size: 24px;
          font-weight: bold;
          color: #111827;
          margin-bottom: 4px;
        }
        .upload-header p {
          font-size: 14px;
          color: #6b7280;
        }
        .upload-box {
          background: #fff;
          border: 2px dashed #d1d5db;
          border-radius: 12px;
          text-align: center;
          padding: 48px;
          margin: 24px 0;
          transition: border-color 0.3s;
        }
        .upload-box:hover { border-color: #3b82f6; }
        .upload-box .icon {
          width: 48px;
          height: 48px;
          background: #eff6ff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
        }
        .upload-box .icon svg { width: 24px; height: 24px; color: #2563eb; }
        .upload-btn {
          display: inline-block;
          background: #2563eb;
          color: #fff;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          margin-top: 8px;
          transition: background 0.3s;
        }
        .upload-btn:hover { background: #1d4ed8; }

        /* Gallery Grid */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
        }
        .gallery-item {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background: #e5e7eb;
          aspect-ratio: 1 / 1;
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .gallery-item:hover { transform: scale(1.02); }
        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .gallery-item button {
          position: absolute;
          top: 8px;
          right: 8px;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 50%;
          padding: 4px;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .gallery-item:hover button { opacity: 1; }

        /* === Zoom Modal === */
        .zoom-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease;
        }
        .zoom-box {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          animation: scaleIn 0.3s ease;
        }
        .zoom-box img {
          width: 100%;
          height: auto;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          transition: transform 0.3s ease;
        }
        .close-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(239, 68, 68, 0.9);
          color: white;
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .close-btn:hover { background: #dc2626; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.9); } to { transform: scale(1); } }
      `}</style>

      <div className="container">
        {admin && (
          <div>
            <div className="upload-header">
              <h1>Upload Your Images</h1>
              <p>Supports: JPG, PNG, GIF up to 10MB</p>
            </div>

            <div className="upload-box">
              <div className="icon">
                <Upload />
              </div>
              <p>Drag & drop files here</p>
              <p>or click below</p>
              <label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
                <span className="upload-btn">Browse Files</span>
              </label>
            </div>
          </div>
        )}

        {uploadedFiles.length > 0 && (
          <div className="upload-list">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="upload-item">
                <div className="icon-box">
                  <Upload />
                </div>
                <div className="details">
                  <p>{file.name}</p>
                  <div className="progress-bar">
                    <div
                      className="fill"
                      style={{ width: `${file.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Gallery */}
        <div className="gallery-header">
          <h2>Your Gallery</h2>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className="gallery-item"
              onClick={() => setZoomedImage(img.url)} // 👈 zoom on click
            >
              <img src={img.url} alt={`Gallery ${idx + 1}`} />
              {admin && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent zoom when deleting
                    handleDelete(img);
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Zoom Modal */}
        {zoomedImage && (
          <div className="zoom-overlay" onClick={() => setZoomedImage(null)}>
            <div className="zoom-box" onClick={(e) => e.stopPropagation()}>
              <img src={zoomedImage} alt="Zoomed" />
              <button className="close-btn" onClick={() => setZoomedImage(null)}>
                <X size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
