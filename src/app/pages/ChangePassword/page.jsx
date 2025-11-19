"use client";

import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [message, setMessage] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");

  if (newPassword !== confirmPassword) {
    setMessage("❌ New password and Confirm password do not match.");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@gmail.com", // TODO: replace this with logged-in user email
        oldPassword,
        newPassword,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage("❌ " + data.message);
      return;
    }

    setMessage("✅ Password updated successfully!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");

  } catch (error) {
    setMessage("❌ Something went wrong. Try again!");
  }
};

  return (
    <>
      <style>
        {`
/* Same styles copied from SignInPage */

/* Container */
.change-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #eff6ff, #ffffff, #f3e8ff);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  flex-direction: column;
}

/* Card */
.change-card {
  background: #fff;
  padding: 32px;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  width: 100%;
  max-width: 420px;
  text-align: center;
}

.change-header h1 {
  font-size: 28px;
  font-weight: bold;
  color: #111827;
}

.change-header p {
  color: #6b7280;
  margin-top: 4px;
}

.change-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #3b82f6, #9333ea);
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 16px;
}

.lock-icon {
  color: white;
  width: 32px;
  height: 32px;
}

/* Form */
.form-group {
  text-align: left;
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 14px;
  color: #374151;
  margin-bottom: 4px;
  font-weight: 500;
}

.input-wrapper {
  position: relative;
}

.input-wrapper input {
  width: 100%;
  padding: 12px 40px 12px 40px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  outline: none;
  font-size: 14px;
  transition: all 0.2s ease;
}

.input-wrapper input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px #bfdbfe;
}

.input-icon {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #9ca3af;
  width: 20px;
  height: 20px;
}

.eye-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
}

.eye-btn:hover {
  color: #4b5563;
}

/* Submit Button */
.change-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(to right, #3b82f6, #9333ea);
  border: none;
  color: white;
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.change-btn:hover {
  transform: scale(1.02);
  background: linear-gradient(to right, #2563eb, #7e22ce);
}

/* Message */
.message {
  margin-top: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #dc2626;
}
`}
      </style>

      <div className="change-container">
        <div className="change-card">
          <div className="change-header">
            <div className="change-icon">
              <Lock className="lock-icon" />
            </div>
            <h1>Change Password</h1>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Old Password */}
            <div className="form-group">
              <label>Old Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type={showOld ? "text" : "password"}
                  value={oldPassword}
                  placeholder="Enter old password"
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowOld(!showOld)}
                >
                  {showOld ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="form-group">
              <label>New Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  placeholder="Enter new password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowNew(!showNew)}
                >
                  {showNew ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  placeholder="Confirm new password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <button type="submit" className="change-btn">
              Update Password
            </button>

            {message && <p className="message">{message}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
