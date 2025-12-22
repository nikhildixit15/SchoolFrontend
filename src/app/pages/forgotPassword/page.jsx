"use client";

import { useState } from "react";
import "./page.css"

export default function ResetPassword() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // SEND OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      setIsLoading(true);
      setIsLoading(false);
      setStep(2);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setError("OTP sending failed. Try again.");
    }
  };

  // VERIFY OTP + RESET PASSWORD
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New Password & Confirm Password do not match.");
      return;
    }

    try {
      setIsLoading(true);

      await window.confirmationResult.confirm(otp);

      // If OTP Verified
      setIsLoading(false);
      setSuccess(true);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      setError("Invalid OTP. Try again.");
    }
  };

  return (
    <>
      {/* Recaptcha Container */}
      <div id="recaptcha-container"></div>

      {success ? (
        <div className="containerForgot">
          <div className="card success-box">
            <div className="success-title">Password Updated!</div>
            <p>Your password has been successfully changed.</p>

            <button
              className="button"
              onClick={() => (window.location.href = "/login")}
            >
              Go to Login
            </button>
          </div>
        </div>
      ) : (
        <div className="containerForgot">
          <div className="card">
            <h2 className="title">Reset Password</h2>
            <p className="subtitle">Enter your details to reset password</p>

            {step === 1 && (
              <form onSubmit={handleSendOTP}>
                <label className="label">Phone Number</label>
                <input
                  type="tel"
                  className="input"
                  placeholder="Enter phone number"
                  value={phone}
                  maxLength={10}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 10) setPhone(value);
                  }}
                />

                {error && <div className="error">{error}</div>}

                <button className="button" disabled={isLoading}>
                  {isLoading ? "Sending OTP..." : "Send OTP"}
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleResetPassword}>
                <label className="label">Enter OTP</label>
                <input
                  type="number"
                  className="input"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  maxLength={6}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 6) setOtp(value);
                  }}
                />

                <label className="label">New Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <label className="label">Confirm Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {error && <div className="error">{error}</div>}

                <button className="button" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Reset Password"}
                </button>

                <div className="back" onClick={() => setStep(1)}>
                  ← Back
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
